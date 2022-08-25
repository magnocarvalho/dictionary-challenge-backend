import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class EntriesDto {
  @ApiProperty()
  @IsNotEmpty()
  public word: string;
}
