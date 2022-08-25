import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { IMessage } from './common/interfaces/message.interface';

@Controller()
@ApiTags('Root')
export class AppController {
  constructor(private readonly appService: AppService) {}
  /**
   * @summary Method to get all Entries for root URL and return simple message.
   *
   * @return {*} IMessage
   * @memberof AppController
   */
  @Get()
  @ApiResponse({ status: 200, description: 'Retornar a mensagem "Fullstack Challenge 🏅 - Dictionary"' })
  getHello(): IMessage {
    return this.appService.getHello();
  }
}
