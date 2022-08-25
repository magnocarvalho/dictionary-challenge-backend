import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthUserDto } from './dtos/auth-user.dto';
import { signinDto } from './dtos/signin.dto';
import { signupDto } from './dtos/signup.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  @Post('/signup')
  async signup(@Body() bodyUser: signupDto): Promise<AuthUserDto> {
    return {
      'id': 'f3a10cec013ab2c1380acef',
      'name': 'User 1',
      'token': 'Bearer JWT.Token',
    };
  }

  @Post('/signin')
  async signin(@Body() bodyUser: signinDto): Promise<AuthUserDto> {
    return {
      'id': 'f3a10cec013ab2c1380acef',
      'name': 'User 1',
      'token': 'Bearer JWT.Token',
    };
  }
}
