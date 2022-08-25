import { ApiProperty } from '@nestjs/swagger';

export class EntriesDto {
  @ApiProperty()
  public word: string;
}
