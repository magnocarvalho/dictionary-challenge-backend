import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entries } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entries])],
  providers: [EntriesService],
  controllers: [EntriesController],
})
export class EntriesModule {}
