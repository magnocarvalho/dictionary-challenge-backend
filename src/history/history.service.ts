import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuth } from 'src/common/interfaces/user.interface';
import { EntriesDto } from 'src/entries/dtos';
import { EntriesEntity } from 'src/entries/entity';
import { UserEntity } from 'src/user/entity';
import { Repository } from 'typeorm';
import { HistoryEntity } from './entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistoryEntity)
    private historyRepository: Repository<HistoryEntity>
  ) {}

  async createHistory(user: UserEntity, dictionary: EntriesEntity): Promise<void> {
    try {
      const historyEntity = this.historyRepository.create({ userId: user._id.toString(), dictionaryId: dictionary._id.toString() });
      await this.historyRepository.save(historyEntity);
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}
