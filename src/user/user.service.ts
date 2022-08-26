import { BadRequestException, ConflictException, Injectable, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from 'src/auth/dtos/signup.dto';

import { UserEntity } from './entity';
import { ObjectID, Repository } from 'typeorm';
import { AuthenticatedUser, UserAuth } from 'src/common/interfaces/user.interface';
import { ProfileDto } from 'src/auth/dtos/profile.dto';
import { PageDto, PageOptionsDto } from 'src/common/dtos';
import { HistoryService } from 'src/history/history.service';
import { EntriesService } from 'src/entries/entries.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly historyService: HistoryService
  ) {}
  async getProfile(user: UserAuth): Promise<ProfileDto> {
    const me = await this.findByEmail(user?.email);
    delete me.password;
    return me as ProfileDto;
  }
  // async getEntriesEn(pageOptionsDto: PageOptionsDto): Promise<PageDto<EntriesDto>> {
  //   const [listagem, qtd] = await this.entriesRepository.findAndCount({
  //     order: {
  //       createdAt: pageOptionsDto.order || 'DESC',
  //     },
  //     skip: pageOptionsDto.page,
  //     take: pageOptionsDto.limit,
  //   });
  //   return new PageDto(listagem, pageOptionsDto, qtd);
  // }
  async getProfileHistory(user: UserAuth, pageOptionsDto: PageOptionsDto): Promise<PageDto<any>> {
    const me = await this.findByEmail(user?.email);
    const { listagem, qtd } = await this.historyService.getFavorites(me._id.toString(), pageOptionsDto);
    return new PageDto(listagem, pageOptionsDto, qtd);
  }
  async getProfileFavorites(user: UserAuth): Promise<any> {
    return (await this.findByEmail(user?.email)) as ProfileDto;
  }

  async create(newUser: SignupDto): Promise<UserEntity> {
    try {
      const entriesEntity = this.userRepository.create(newUser);
      return await this.userRepository.save(entriesEntity);
    } catch (error) {
      throw new ConflictException(error);
    }
  }

  async findByEmail(email: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      throw new PreconditionFailedException(error);
    }
  }

  async findById(_id: string) {
    try {
      return await this.userRepository.findOne({ where: { _id: new ObjectID(_id) } });
    } catch (error) {
      throw new PreconditionFailedException(error);
    }
  }
}
