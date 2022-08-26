import { Injectable } from '@nestjs/common';
import { IMessage } from './common/interfaces/message.interface';

@Injectable()
export class AppService {
  /**
   * @description - Method to return a message ROOT
   *
   * @return {*}  {IMessage}
   * @memberof AppService
   */
  getHello(): IMessage {
    return {
      message: 'Fullstack Challenge 🏅 - Dictionary',
    };
  }
}
