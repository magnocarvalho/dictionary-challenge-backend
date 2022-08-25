import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntriesEntity } from './entity';
import { AuthModule } from 'src/auth/auth.module';
import { HistoryModule } from 'src/history/history.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([EntriesEntity]), AuthModule, HistoryModule, UserModule],
  providers: [EntriesService],
  controllers: [EntriesController],
})
export class EntriesModule {}
