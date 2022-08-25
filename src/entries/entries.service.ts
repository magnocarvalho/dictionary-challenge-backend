import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto, PageOptionsDto } from 'src/common/dtos';
import { Repository } from 'typeorm';
import { EntriesDto } from './dtos';
import { EntriesEntity } from './entity';
import axios from 'axios';
import { EntriesCreateDto } from './dtos/create-entries.dto';
import { HistoryService } from 'src/history/history.service';
import { UserService } from 'src/user/user.service';
const API_DICTIONARY_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(EntriesEntity)
    private entriesRepository: Repository<EntriesEntity>,
    private readonly historyService: HistoryService,
    private readonly userService: UserService
  ) {}

  async getEntriesEn(pageOptionsDto: PageOptionsDto): Promise<PageDto<EntriesDto>> {
    return new PageDto([{ word: 'word' }], pageOptionsDto, 10);
  }

  async getEntriesEnWord(word: string, usuario: any): Promise<any> {
    const user = await this.userService.findByEmail(usuario.email);
    const exisitngContact = await this.findOneByword(word);

    if (!exisitngContact) {
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

    return exisitngContact;
  }

  async postFavoriteWord(word: string): Promise<any> {
    return {
      word,
      description: 'This is the Entries page',
    };
  }

  async postUnfavoriteWord(word: string): Promise<any> {
    return {
      word,
      description: 'This is the Entries page',
    };
  }

  private async findOneByword(word: string): Promise<EntriesEntity> {
    try {
      return await this.entriesRepository.findOne({ where: { word } });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  private async getDictionaryAPI(word: string): Promise<any> {
    try {
      const { data, status } = await axios.get(API_DICTIONARY_URL + word);
      return { data, status };
    } catch (error) {
      throw new NotFoundException('Word not Exist');
    }
  }

  private async create(entriesDto: EntriesCreateDto): Promise<EntriesEntity> {
    try {
      const entriesEntity = this.entriesRepository.create(entriesDto);
      return await this.entriesRepository.save(entriesEntity);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
