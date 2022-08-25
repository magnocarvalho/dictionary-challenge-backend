import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntriesEntity } from './entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([EntriesEntity]), AuthModule],
  providers: [EntriesService],
  controllers: [EntriesController],
})
export class EntriesModule {}
