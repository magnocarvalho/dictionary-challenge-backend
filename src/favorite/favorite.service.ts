import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageOptionsDto } from 'src/common/dtos';
import { UserAuth } from 'src/common/interfaces/user.interface';
import { EntriesDto } from 'src/entries/dtos';
import { EntriesEntity } from 'src/entries/entity';
import { HistoryEntity } from 'src/history/entity';
import { UserEntity } from 'src/user/entity';
import { DeleteResult, Like, Repository } from 'typeorm';
import { FavoriteEntity } from './entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private favoriteRepository: Repository<FavoriteEntity>
  ) {}

  /**
   * @description Create a new favorite
   *
   * @param {UserEntity} user
   * @param {EntriesEntity} dictionary
   * @return {*}  {Promise<FavoriteEntity>}
   * @memberof FavoriteService
   */
  async createFavorite(user: UserEntity, dictionary: EntriesEntity): Promise<FavoriteEntity> {
    try {
      const favoriteEntity = this.favoriteRepository.create({ user, dictionary });
      return await this.favoriteRepository.save(favoriteEntity);
    } catch (error) {
      throw new ConflictException(error);
    }
  }

  /**
   * @description delete favorite by userId and dictionaryId
   *
   * @param {number} userId
   * @param {number} dictionaryId
   * @return {*}  {Promise<DeleteResult>}
   * @memberof FavoriteService
   */
  async findFavorite2Remove(userId: number, dictionaryId: number): Promise<DeleteResult> {
    try {
      const historyResult = await this.favoriteRepository.findOne({ where: { user: { id: userId }, dictionary: { id: dictionaryId } } });

      if (!historyResult) {
        throw new NotFoundException('History not found');
      }
      const histDeletado = await this.favoriteRepository.softDelete(historyResult?.id);
      return histDeletado;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  /**
   * @description get getFavorite by userId
   *
   * @param {string} userId
   * @param {PageOptionsDto} pageOptionsDto
   * @return {*}  {Promise<PageDto<HistoryEntity>>}
   * @memberof HistoryService
   */
  async getFavorite(userId: number, pageOptionsDto: PageOptionsDto): Promise<{ listagem: HistoryEntity[]; qtd: number }> {
    const whereOption = {
      user: { id: userId },
      dictionary: undefined,
    };
    if (pageOptionsDto.search) {
      whereOption.dictionary = { word: Like(`%${pageOptionsDto.search}%`) };
    }
    const [listagem, qtd] = await this.favoriteRepository.findAndCount({
      order: {
        createdAt: pageOptionsDto.order || 'DESC',
      },
      where: whereOption,
      relations: { dictionary: true },
      skip: pageOptionsDto.page,
      take: pageOptionsDto.limit,
    });
    return { listagem: listagem, qtd };
  }
}
