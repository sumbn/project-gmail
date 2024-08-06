import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { dataSourceOptions } from '../db/data-source';
import { Account } from './account/entities/account.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

// @Module({
//   imports: [TypeOrmModule.forRoot(dataSourceOptions), AccountModule],
//   controllers: [AppController],
//   providers: [AppService],
// })

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
        entities: [Account],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
