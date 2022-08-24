import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('Root')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Retornar a mensagem "Fullstack Challenge 🏅 - Dictionary"' })
  getHello(): any {
    return this.appService.getHello();
  }
}
