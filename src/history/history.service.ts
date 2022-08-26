import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto, PageOptionsDto } from 'src/common/dtos';
import { UserAuth } from 'src/common/interfaces/user.interface';
import { EntriesDto } from 'src/entries/dtos';
import { EntriesEntity } from 'src/entries/entity';
import { EntriesService } from 'src/entries/entries.service';
import { UserEntity } from 'src/user/entity';
import { DeleteResult, ObjectID, Repository } from 'typeorm';
import { HistoryEntity } from './entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistoryEntity)
    private historyRepository: Repository<HistoryEntity>
  ) {}

  async createHistory(user: UserEntity, dictionary: EntriesEntity): Promise<void> {
    try {
      const historyEntity = this.historyRepository.create({ user: user, dictionary: dictionary });
      await this.historyRepository.save(historyEntity);
    } catch (error) {
      throw new ConflictException(error);
    }
  }

  async findFavorite2Remove(userId: string, dictionaryId: string): Promise<DeleteResult> {
    try {
      const historyResult = { id: null };
      // = await this.historyRepository.findOne({ where: { user, dictionaryId: dictionaryId } });
      if (!historyResult) {
        throw new NotFoundException('History not found');
      }
      const histDeletado = await this.historyRepository.delete(historyResult?.id);
      return histDeletado;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
  /**
   * get favoritos
   *
   * @param {string} userId
   * @param {PageOptionsDto} pageOptionsDto
   * @return {*}  {Promise<PageDto<HistoryEntity>>}
   * @memberof HistoryService
   */
  async getFavorites(userId: string, pageOptionsDto: PageOptionsDto): Promise<{ listagem: HistoryEntity[]; qtd: number }> {
    const [listagem, qtd] = await this.historyRepository.findAndCount({
      order: {
        createdAt: pageOptionsDto.order || 'DESC',
      },
      // where: { user: { id: userId } },
      skip: pageOptionsDto.page,
      take: pageOptionsDto.limit,
    });
    /** gambiarra =/ o typeORM e pessimo com MongoBD */

    // eu ja tenho a listagem de favoritos com id vou trazer o valor com o findOne mesmo
    // const listagem = await this.historyRepository.find({ where: { userId } });
    // const listagem2 = await this.entriesService.getEntriesList(listagem);
    // return new PageDto(listagem2, pageOptionsDto, qtd);
    return { listagem: listagem, qtd };
  }
}
