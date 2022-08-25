import { Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { PageDto, PageOptionsDto } from 'src/common/dtos';
import { EntriesDto } from './dtos/entries.dto';
import { EntriesService } from './entries.service';

@Controller('entries')
@ApiTags('Entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Get('/en')
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(EntriesDto)
  async getEntriesEn(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<EntriesDto>> {
    return this.entriesService.getEntriesEn(pageOptionsDto);
  }

  @Get('/en/:word')
  async getEntriesEnWord(@Param('word') word: string): Promise<any> {
    return this.entriesService.getEntriesEnWord(word);
  }

  @Post('/en/:word/favorite')
  async postFavoriteWord(@Param('word') word: string): Promise<any> {
    return this.entriesService.postFavoriteWord(word);
  }

  @Post('/en/:word/unfavorite')
  async postUnfavoriteWord(@Param('word') word: string): Promise<any> {
    return this.entriesService.postUnfavoriteWord(word);
  }
}
