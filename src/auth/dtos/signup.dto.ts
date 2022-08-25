import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString, IsEmail, Min, Max, Length } from 'class-validator';

export class SignupDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'Has to be a valid email address',
    example: 'email@email.com',
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
