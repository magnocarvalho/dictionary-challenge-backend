import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { signupDto } from 'src/auth/dtos/signup.dto';
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

  private async create(newUser: signupDto): Promise<UserEntity> {
    const entriesEntity = this.userRepository.create(newUser);

    return await this.userRepository.save(entriesEntity);
  }
}
