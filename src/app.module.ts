// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { AccountModule } from './account/account.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { dataSourceOptions } from '../db/data-source';
// import { HotmailModule } from './hotmail/hotmail.module';
// import { UserModule } from './user/user.module';
// import { AuthModule } from './auth/auth.module';
// import { GenModule } from './gen/gen.module';
// @Module({
//   imports: [
//     TypeOrmModule.forRoot(dataSourceOptions),
//     AccountModule,
//     HotmailModule,
//     UserModule,
//     AuthModule,
//     GenModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })

//------------------OPTION 2----------------------------

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import {
  AccountPlatform,
  AccountStatus,
  AccountUser,
  AccountUserPlatform,
} from './account/entities';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {
  KeyWordSearch,
  Password,
  Theme,
  UserInfoGen,
} from './gen/entities/data.entity';
import { JunkGmail } from './gen/entities/junkGmail.entity';
import { GenModule } from './gen/gen.module';
import { HotMail } from './hotmail/entities/hotmail.entity';
import { HotmailModule } from './hotmail/hotmail.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

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
        entities: [
          UserInfoGen,
          Theme,
          Password,
          HotMail,
          User,
          KeyWordSearch,
          JunkGmail,
          AccountPlatform,
          AccountStatus,
          AccountUser,
          AccountUserPlatform,
        ],
        // logger: 'advanced-console',
        // logging: 'all',
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    AccountModule,
    HotmailModule,
    UserModule,
    AuthModule,
    GenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
