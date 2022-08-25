import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { HistoryEntity } from './entity';
import { HistoryService } from './history.service';

@Module({
  imports: [TypeOrmModule.forFeature([HistoryEntity]), UserModule],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
