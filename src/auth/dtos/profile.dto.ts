import { ApiProperty } from '@nestjs/swagger';
import { AuthUserDto } from './auth-user.dto';

export class ProfileDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  createdAt: any;
  @ApiProperty()
  updatedAt: any;
  @ApiProperty()
  _id: any;
}
