import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBasicAuth, ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Retornar o perfil do usúario' })
  async getProfile(@Req() req: any): Promise<any> {
    return req.user;
    // return await this.userService.getProfile();
  }

  @Get('/me/history')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Retornar a lista de palavras visitadas' })
  async getProfileHistory(@Req() req: any): Promise<any> {
    return this.userService.getProfile();
  }

  @Get('/me/favorites')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Retornar a lista de palavras marcadas como favoritas' })
  async getProfileFavorites(): Promise<any> {
    return this.userService.getProfile();
  }
}
