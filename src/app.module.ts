// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { AccountModule } from './account/account.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { dataSourceOptions } from '../db/data-source';
// import { HotmailModule } from './hotmail/hotmail.module';
// @Module({
//   imports: [
//     TypeOrmModule.forRoot(dataSourceOptions),
//     AccountModule,
//     HotmailModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })

//------------------OPTION 2----------------------------

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account/entities/account.entity';
import { AccountModule } from './account/account.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  Address,
  FirstName,
  LastName,
  Password,
} from './account/entities/data.entity';
import { HotmailModule } from './hotmail/hotmail.module';
import { HotMail } from './hotmail/entities/hotmail.entity';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE_NAME'),
        entities: [Account, Address, FirstName, LastName, Password, HotMail],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    AccountModule,
    HotmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
