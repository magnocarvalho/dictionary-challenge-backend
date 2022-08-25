import { Injectable } from '@nestjs/common';

@Injectable()
export class EntriesService {
  async getEntriesEn(): Promise<any> {
    return {
      title: 'Entries',
      description: 'This is the Entries page',
    };
  }

  async getEntriesEnWord(word: string): Promise<any> {
    return {
      word,
      description: 'This is the Entries page',
    };
  }

  async postFavoriteWord(word: string): Promise<any> {
    return {
      word,
      description: 'This is the Entries page',
    };
  }

  async postUnfavoriteWord(word: string): Promise<any> {
    return {
      word,
      description: 'This is the Entries page',
    };
  }
}
