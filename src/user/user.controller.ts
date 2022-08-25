import { Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @ApiResponse({ status: 200, description: 'Retornar o perfil do usúario' })
  async getProfile(): Promise<any> {
    return this.userService.getProfile();
  }

  @Get('/me/history')
  @ApiResponse({ status: 200, description: 'Retornar a lista de palavras visitadas' })
  async getProfileHistory(): Promise<any> {
    return this.userService.getProfile();
  }

  @Get('/me/favorites')
  @ApiResponse({ status: 200, description: 'Retornar a lista de palavras marcadas como favoritas' })
  async getProfileFavorites(): Promise<any> {
    return this.userService.getProfile();
  }
}
