import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class EntriesDto {
  @ApiProperty()
  @IsNotEmpty()
  public word: string;
}
