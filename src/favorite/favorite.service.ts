import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuth } from 'src/common/interfaces/user.interface';
import { EntriesDto } from 'src/entries/dtos';
import { EntriesEntity } from 'src/entries/entity';
import { UserEntity } from 'src/user/entity';
import { Repository } from 'typeorm';
import { FavoriteEntity } from './entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private favoriteRepository: Repository<FavoriteEntity>
  ) {}
  async createFavorite(user: UserEntity, dictionary: EntriesEntity): Promise<FavoriteEntity> {
    try {
      const favoriteEntity = this.favoriteRepository.create({ userId: user._id.toString(), dictionaryId: dictionary._id.toString() });
      return await this.favoriteRepository.save(favoriteEntity);
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}