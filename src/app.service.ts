import { Injectable } from '@nestjs/common';
import { IMessage } from './common/interfaces/message.interface';

@Injectable()
export class AppService {
  getHello(): IMessage {
    return {
      message: 'Fullstack Challenge 🏅 - Dictionary',
    };
  }
}
