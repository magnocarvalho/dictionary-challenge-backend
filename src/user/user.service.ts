import { BadRequestException, ConflictException, Injectable, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from 'src/auth/dtos/signup.dto';

import { UserEntity } from './entity';
import { ObjectID, Repository } from 'typeorm';
import { AuthenticatedUser, UserAuth } from 'src/common/interfaces/user.interface';
import { ProfileDto } from 'src/auth/dtos/profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}
  async getProfile(user: UserAuth): Promise<ProfileDto> {
    const me = await this.findByEmail(user?.email);
    delete me.password;
    return me as ProfileDto;
  }

  async getProfileHistory(user: UserAuth): Promise<any> {
    return await this.findByEmail(user?.email);
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
