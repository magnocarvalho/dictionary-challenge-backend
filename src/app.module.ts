import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { EntriesModule } from './entries/entries.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { Entries } from './entries/entity';
import { User } from './user/entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_URL,
      // host: 'cluster0.f3z1zqw.mongodb.net',
      // port: 27017,
      database: 'projeto1',
      entities: [Entries, User],
      ssl: true,
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
    }),
    EntriesModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
