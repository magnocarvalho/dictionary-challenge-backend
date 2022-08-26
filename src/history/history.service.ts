import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageOptionsDto } from 'src/common/dtos';
import { EntriesEntity } from 'src/entries/entity';
import { UserEntity } from 'src/user/entity';
import { Like, Repository } from 'typeorm';
import { HistoryEntity } from './entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistoryEntity)
    private historyRepository: Repository<HistoryEntity>
  ) {}

  /**
   * @description Create a new history
   *
   * @param {UserEntity} user
   * @param {EntriesEntity} dictionary
   * @return {*}  {Promise<void>}
   * @memberof HistoryService
   */
  async createHistory(user: UserEntity, dictionary: EntriesEntity): Promise<void> {
    try {
      const historyEntity = this.historyRepository.create({ user: user, dictionary: dictionary });
      await this.historyRepository.save(historyEntity);
    } catch (error) {
      throw new ConflictException(error);
    }
  }

  /**
   *  @description get getHistoric
   *
   * @param {string} userId
   * @param {PageOptionsDto} pageOptionsDto
   * @return {*}  {Promise<PageDto<HistoryEntity>>}
   * @memberof HistoryService
   */
  async getHistoric(userId: number, pageOptionsDto: PageOptionsDto): Promise<{ listagem: HistoryEntity[]; qtd: number }> {
    const whereOption = {
      user: { id: userId },
      dictionary: undefined,
    };
    if (pageOptionsDto.search) {
      whereOption.dictionary = { word: Like(`%${pageOptionsDto.search}%`) };
    }
    const [listagem, qtd] = await this.historyRepository.findAndCount({
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
