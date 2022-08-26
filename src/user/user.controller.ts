import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfileDto } from 'src/auth/dtos/profile.dto';
import { JwtAuthGuard } from 'src/auth/jwt';
import { PageOptionsDto } from 'src/common/dtos';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * @description get Profile info
   *
   * @param {*} req
   * @return {*}  {Promise<ProfileDto>}
   * @memberof UserController
   */
  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Retornar o perfil do usúario' })
  async getProfile(@Req() req: any): Promise<ProfileDto> {
    // return req.user;
    return await this.userService.getProfile(req?.user);
  }

  /**
   * @description get all users history from the database paginated
   *
   * @param {*} req
   * @param {PageOptionsDto} pageOptionsDto
   * @return {*}  {Promise<any>}
   * @memberof UserController
   */
  @Get('/me/history')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Retornar a lista de palavras visitadas' })
  async getProfileHistory(@Req() req: any, @Query() pageOptionsDto: PageOptionsDto): Promise<any> {
    return await this.userService.getProfileHistory(req?.user, pageOptionsDto);
  }
  /**
   * @description get all users favorites from the database paginated
   *
   * @param {*} req
   * @param {PageOptionsDto} pageOptionsDto
   * @return {*}  {Promise<any>}
   * @memberof UserController
   */
  @Get('/me/favorites')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Retornar a lista de palavras marcadas como favoritas' })
  async getProfileFavorites(@Req() req: any, @Query() pageOptionsDto: PageOptionsDto): Promise<any> {
    return this.userService.getProfileFavorites(req?.user, pageOptionsDto);
  }
}
