import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { PageDto, PageOptionsDto } from 'src/common/dtos';
import { EntriesDto } from './dtos/entries.dto';
import { EntriesService } from './entries.service';

@Controller('entries')
@ApiTags('Entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  /**
   * Method to get all Entries with filter.
   *
   * @param {PageOptionsDto} pageOptionsDto
   * @return {*}  {Promise<PageDto<EntriesDto>>}
   * @memberof EntriesController
   */
  @Get('/en')
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(EntriesDto)
  async getEntriesEn(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<EntriesDto>> {
    return this.entriesService.getEntriesEn(pageOptionsDto);
  }

  @Get('/en/:word')
  @ApiResponse({ status: 200, description: 'Retornar as informações da palavra especificada e registra o histórico de acesso.' })
  async getEntriesEnWord(@Param('word') word: string): Promise<any> {
    return this.entriesService.getEntriesEnWord(word);
  }

  @Post('/en/:word/favorite')
  async postFavoriteWord(@Param('word') word: string): Promise<any> {
    return this.entriesService.postFavoriteWord(word);
  }

  @Delete('/en/:word/unfavorite')
  async postUnfavoriteWord(@Param('word') word: string): Promise<any> {
    return this.entriesService.postUnfavoriteWord(word);
  }
}
