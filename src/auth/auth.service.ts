import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { SignupDto } from './dtos/signup.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(newUser: SignupDto): Promise<UserEntity> {
    return this.userService.create(newUser);
  }
}
