import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBasicAuth, ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfileDto } from 'src/auth/dtos/profile.dto';
import { JwtAuthGuard } from 'src/auth/jwt';
import { PageOptionsDto } from 'src/common/dtos';
import { AuthenticatedUser } from 'src/common/interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Retornar o perfil do usúario' })
  async getProfile(@Req() req: any): Promise<ProfileDto> {
    // return req.user;
    return await this.userService.getProfile(req?.user);
  }

  @Get('/me/history')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Retornar a lista de palavras visitadas' })
  async getProfileHistory(@Req() req: any, @Query() pageOptionsDto: PageOptionsDto): Promise<any> {
    return await this.userService.getProfileHistory(req?.user, pageOptionsDto);
  }

  @Get('/me/favorites')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Retornar a lista de palavras marcadas como favoritas' })
  async getProfileFavorites(@Req() req: any): Promise<any> {
    return this.userService.getProfileFavorites(req?.user);
  }
}
