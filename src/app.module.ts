import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EntriesModule } from './entries/entries.module';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EntriesEntity } from './entries/entity';
import { UserEntity } from './user/entity';
import { HistoryModule } from './history/history.module';
import { AppController } from './app.controller';
import { HistoryEntity } from './history/entity';
import { FavoriteModule } from './favorite/favorite.module';
import { FavoriteEntity } from './favorite/entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_URL,
      // host: 'cluster0.f3z1zqw.mongodb.net',
      // port: 27017,
      database: 'projeto1',
      entities: [EntriesEntity, UserEntity, HistoryEntity, FavoriteEntity],
      ssl: true,
      synchronize: false,
      useNewUrlParser: true,
      logging: true,
    }),
    EntriesModule,
    UserModule,
    AuthModule,
    HistoryModule,
    FavoriteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
