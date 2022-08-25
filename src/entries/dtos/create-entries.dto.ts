import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IDictionary } from '../interface';

export class EntriesCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  public word: string;

  @ApiProperty({ isArray: true })
  @IsArray()
  @IsNotEmpty()
  public dictionary: IDictionary[];
}
