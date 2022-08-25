import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dtos/auth-user.dto';
import { SigninDto } from './dtos/signin.dto';
import { SignupDto } from './dtos/signup.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  async signup(@Body() bodyUser: SignupDto): Promise<AuthUserDto> {
    return await this.authService.signup(bodyUser);
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  async signin(@Body() bodyUser: SigninDto): Promise<AuthUserDto> {
    return {
      'id': 'f3a10cec013ab2c1380acef',
      'name': 'User 1',
      'token': 'Bearer JWT.Token',
    };
  }
}
