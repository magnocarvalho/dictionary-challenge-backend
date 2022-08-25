import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity';
import { HistoryModule } from 'src/history/history.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), HistoryModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
