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
  /**
   * @description signup user and return JWT token
   *
   * @param {SignupDto} bodyUser
   * @return {*}  {Promise<AuthUserDto>}
   * @memberof AuthController
   */
  @Post('/signup')
  @UsePipes(ValidationPipe)
  async signup(@Body() bodyUser: SignupDto): Promise<AuthUserDto> {
    return await this.authService.signup(bodyUser);
  }
  /**
   * @description Signin user and return JWT token
   *
   * @param {SigninDto} bodyUser
   * @return {*}  {Promise<AuthUserDto>}
   * @memberof AuthController
   */
  @Post('/signin')
  @UsePipes(ValidationPipe)
  async signin(@Body() bodyUser: SigninDto): Promise<AuthUserDto> {
    return await this.authService.signin(bodyUser);
  }
}
