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
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DATABASE,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      // url: process.env.DATABASE_URL,
      migrationsTableName: 'typeorm_migrations',
      logger: 'advanced-console',
      entities: [EntriesEntity, UserEntity, HistoryEntity, FavoriteEntity],
      // ssl: process.env.POSTGRES_SSL == 'true',
      synchronize: true,
      logging: true,
      // encrypt: false,
      ssl: {
        rejectUnauthorized: false,
      },
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
