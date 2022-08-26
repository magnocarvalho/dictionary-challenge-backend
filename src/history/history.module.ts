import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntriesModule } from 'src/entries/entries.module';
import { UserModule } from 'src/user/user.module';
import { HistoryEntity } from './entity';
import { HistoryService } from './history.service';

@Module({
  imports: [TypeOrmModule.forFeature([HistoryEntity])],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
