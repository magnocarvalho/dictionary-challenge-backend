import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entity';
import { UserService } from 'src/user/user.service';
import { AuthUserDto } from './dtos/auth-user.dto';
import { SigninDto } from './dtos/signin.dto';
import { SignupDto } from './dtos/signup.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private jwtService: JwtService) {}
  /**
   * @description Signup user and return JWT token
   *
   * @param {SignupDto} newUser
   * @return {*}  {Promise<AuthUserDto>}
   * @memberof AuthService
   */
  async signup(newUser: SignupDto): Promise<AuthUserDto> {
    const userNew: UserEntity = await this.userService.create(newUser);
    return this.getAuthUserDto(userNew);
  }
  /**
   * @description Signin user and return JWT token
   *
   * @param {SigninDto} authLoginDto
   * @return {*}  {Promise<AuthUserDto>}
   * @memberof AuthService
   */
  async signin(authLoginDto: SigninDto): Promise<AuthUserDto> {
    const { email, password } = authLoginDto;

    const user = await this.userService.findByEmail(email);
    if (!(await user?.validatePassword(password))) {
      throw new UnauthorizedException();
    }

    return this.getAuthUserDto(user);
  }

  /**
   * @description Get AuthUserDto from UserEntity
   *
   * @private
   * @param {UserEntity} userNew
   * @return {*}  {AuthUserDto}
   * @memberof AuthService
   */
  private getAuthUserDto(userNew: UserEntity): AuthUserDto {
    const payload = {
      userId: userNew._id,
      email: userNew.email,
    };
    return { id: userNew._id.toString(), name: userNew.name, token: this.jwtService.sign(payload) };
  }
}
