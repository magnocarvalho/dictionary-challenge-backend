import { Injectable } from '@nestjs/common';
import { PageDto, PageOptionsDto } from 'src/common/dtos';
import { EntriesDto } from './dtos';

@Injectable()
export class EntriesService {
  async getEntriesEn(pageOptionsDto: PageOptionsDto): Promise<PageDto<EntriesDto>> {
    // const pageMetaDto = new PageMetaDto({ itemCount: 1, pageOptionsDto });
    return new PageDto([{ word: 'word' }], pageOptionsDto, 10);
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
