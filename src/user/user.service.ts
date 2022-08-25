import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async getProfile(): Promise<any> {
    return {
      'name': 'User 1',
      'email': 'example@email.com',
    };
  }
}
