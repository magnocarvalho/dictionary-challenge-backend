import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class SigninDto {
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
  readonly password: string;
}
