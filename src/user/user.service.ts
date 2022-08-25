import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from 'src/auth/dtos/signup.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}
  async getProfile(): Promise<any> {
    return {
      'name': 'User 1',
      'email': 'example@email.com',
    };
  }

  async create(newUser: SignupDto): Promise<UserEntity> {
    try {
      const entriesEntity = this.userRepository.create(newUser);
      return await this.userRepository.save(entriesEntity);
    } catch (error) {
      throw new ConflictException(error);
    }
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }
}
