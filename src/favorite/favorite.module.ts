import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntriesModule } from 'src/entries/entries.module';
import { FavoriteEntity } from './entity';
import { FavoriteService } from './favorite.service';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteEntity]), forwardRef(() => EntriesModule)],
  providers: [FavoriteService],
  exports: [FavoriteService],
})
export class FavoriteModule {}
