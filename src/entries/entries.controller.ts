import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { PageDto, PageOptionsDto } from 'src/common/dtos';
import { EntriesDto } from './dtos/entries.dto';
import { EntriesService } from './entries.service';

@Controller('entries')
@ApiTags('Entries')
@ApiBearerAuth()
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  /**
   * @description Method to get all Entries with filter.
   *
   * @param {PageOptionsDto} pageOptionsDto
   * @return {*}  {Promise<PageDto<EntriesDto>>}
   * @memberof EntriesController
   */
  @Get('/en')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(EntriesDto)
  async getEntriesEn(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<EntriesDto>> {
    return this.entriesService.getEntriesEn(pageOptionsDto);
  }
  /**
   * @description Method to get word if exists in the database return else get indo API and save in the database.
   *
   * @param {string} word
   * @param {*} req
   * @return {*}  {Promise<any>}
   * @memberof EntriesController
   */
  @Get('/en/:word')
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 200, description: 'Retornar as informações da palavra especificada e registra o histórico de acesso.' })
  async getEntriesEnWord(@Param('word') word: string, @Req() req: any): Promise<any> {
    return this.entriesService.getEntriesEnWord(word, req.user);
  }

  /**
   * @description save favorite word in the database
   *
   * @param {string} word
   * @param {*} req
   * @return {*}  {Promise<any>}
   * @memberof EntriesController
   */
  @Post('/en/:word/favorite')
  @UseGuards(AuthGuard())
  async postFavoriteWord(@Param('word') word: string, @Req() req: any): Promise<any> {
    return this.entriesService.postFavoriteWord(word, req.user);
  }
  /**
   * @description delete history word in the database
   *
   * @param {string} word
   * @param {*} req
   * @return {*}  {Promise<any>}
   * @memberof EntriesController
   */
  @Delete('/en/:word/unfavorite')
  @UseGuards(AuthGuard())
  async postUnfavoriteWord(@Param('word') word: string, @Req() req: any): Promise<any> {
    return this.entriesService.postUnfavoriteWord(word, req.user);
  }
}
