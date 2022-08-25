import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { AuthUserDto } from './dtos/auth-user.dto';
import { SigninDto } from './dtos/signin.dto';
import { SignupDto } from './dtos/signup.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private jwtService: JwtService) {}

  async signup(newUser: SignupDto): Promise<AuthUserDto> {
    const userNew: UserEntity = await this.userService.create(newUser);
    return { id: userNew._id, name: userNew.name, token: 'Exemplo' };
  }

  async signin(authLoginDto: SigninDto): Promise<AuthUserDto> {
    const { email, password } = authLoginDto;

    const user = await this.userService.findByEmail(email);
    if (!(await user?.validatePassword(password))) {
      throw new UnauthorizedException();
    }

    return { id: user._id, name: user.name, token: 'Exemplo' };
  }
}
