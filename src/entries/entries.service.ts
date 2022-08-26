import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto, PageOptionsDto } from 'src/common/dtos';
import { Like, Repository } from 'typeorm';
import { EntriesDto } from './dtos';
import { EntriesEntity } from './entity';
import axios from 'axios';
import { EntriesCreateDto } from './dtos/create-entries.dto';
import { HistoryService } from 'src/history/history.service';
import { UserService } from 'src/user/user.service';
import { UserAuth } from 'src/common/interfaces/user.interface';
import { FavoriteService } from 'src/favorite/favorite.service';
const API_DICTIONARY_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(EntriesEntity)
    private entriesRepository: Repository<EntriesEntity>,
    private readonly historyService: HistoryService,
    private readonly userService: UserService,
    private readonly favoriteService: FavoriteService
  ) {}

  /**
   * @description Create a new entry in the database
   *
   * @private
   * @param {EntriesCreateDto} entriesDto
   * @return {*}  {Promise<EntriesEntity>}
   * @memberof EntriesService
   */
  private async create(entriesDto: EntriesCreateDto): Promise<EntriesEntity> {
    try {
      const entriesEntity = this.entriesRepository.create(entriesDto);
      return await this.entriesRepository.save(entriesEntity);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  /**
   * @decription Get all entries from the database paginated
   *
   * @param {PageOptionsDto} pageOptionsDto
   * @return {*}  {Promise<PageDto<EntriesDto>>}
   * @memberof EntriesService
   */
  async getEntriesEn(pageOptionsDto: PageOptionsDto): Promise<PageDto<EntriesDto>> {
    let whereOption = { word: undefined };
    if (pageOptionsDto.search) {
      whereOption = { word: Like(`%${pageOptionsDto.search}%`) };
    }
    const [listagem, qtd] = await this.entriesRepository.findAndCount({
      order: {
        createdAt: pageOptionsDto.order || 'DESC',
      },
      where: whereOption,
      skip: pageOptionsDto.page,
      take: pageOptionsDto.limit,
    });
    return new PageDto(listagem, pageOptionsDto, qtd);
  }

  /**
   * @description get Dictionary API and create a new entry in the database
   *
   * @param {string} word
   * @param {*} usuario
   * @return {*}  {Promise<any>}
   * @memberof EntriesService
   */
  async getEntriesEnWord(word: string, usuario: any): Promise<any> {
    const user = await this.userService.findByEmail(usuario.email);
    const exisitngWord = await this.findOneByword(word);

    if (!exisitngWord) {
      const { data, status } = await this.getDictionaryAPI(word);
      if (data && status === 200) {
        const entriesDto: EntriesCreateDto = {
          word,
          dictionary: data,
        };
        const entriesEntity = await this.create(entriesDto);
        await this.historyService.createHistory(user, entriesEntity);
        return entriesEntity;
      } else {
        throw new NotFoundException('Word not Exist');
      }
    }
    await this.historyService.createHistory(user, exisitngWord);
    return exisitngWord;
  }

  /**
   * @description save favorite in the database
   *
   * @param {string} word
   * @param {UserAuth} usuario
   * @return {*}  {Promise<any>}
   * @memberof EntriesService
   */
  async postFavoriteWord(word: string, usuario: UserAuth): Promise<any> {
    const me = await this.userService.findByEmail(usuario?.email);
    const exisitngWord = await this.findOneByword(word);
    if (!exisitngWord) {
      throw new NotFoundException('Word not Exist');
    }
    return await this.favoriteService.createFavorite(me, exisitngWord);
  }

  /**
   * @description delete favorite in the database
   *
   * @param {string} word
   * @param {UserAuth} usuario
   * @return {*}  {Promise<any>}
   * @memberof EntriesService
   */
  async postUnfavoriteWord(word: string, usuario: UserAuth): Promise<any> {
    const me = await this.userService.findByEmail(usuario?.email);
    if (!me) {
      throw new UnauthorizedException('User not auth');
    }
    const exisitngWord = await this.findOneByword(word);
    if (!exisitngWord) {
      throw new NotFoundException('Word not Exist');
    }
    const favorite = await this.favoriteService.findFavorite2Remove(me.id, exisitngWord.id);
    return favorite;
  }

  /**
   * @description find one entry WORD in the database
   *
   * @private
   * @param {string} word
   * @return {*}  {Promise<EntriesEntity>}
   * @memberof EntriesService
   */
  private async findOneByword(word: string): Promise<EntriesEntity> {
    try {
      return await this.entriesRepository.findOne({ where: { word } });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  /**
   * Get infos to Dictionary API and return a response to save into database
   *
   * @private
   * @param {string} word
   * @return {*}  {Promise<any>}
   * @memberof EntriesService
   */
  private async getDictionaryAPI(word: string): Promise<any> {
    try {
      const { data, status } = await axios.get(API_DICTIONARY_URL + word);
      return { data, status };
    } catch (error) {
      throw new NotFoundException('Word not Exist');
    }
  }
}
