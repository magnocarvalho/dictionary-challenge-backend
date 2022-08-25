import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { PageOptionsDto } from './page-options.dto';

export class PageDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly results: T[];

  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly limit: number;

  @ApiProperty()
  readonly totalDocs: number;

  @ApiProperty()
  readonly totalPages: number;

  @ApiProperty()
  readonly hasNext: boolean;

  @ApiProperty()
  readonly hasPrev: boolean;

  constructor(results: T[], pageOptionsDto: PageOptionsDto, totalDocs: number) {
    this.results = results;
    this.page = pageOptionsDto.page;
    this.limit = pageOptionsDto.limit;
    this.totalDocs = totalDocs;
    this.totalPages = Math.ceil(this.totalDocs / this.limit);
    this.hasNext = this.page > 1;
    this.hasPrev = this.page < this.totalPages;
  }
}
