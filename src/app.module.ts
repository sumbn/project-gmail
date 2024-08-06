import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { dataSourceOptions } from '../db/data-source';
import { Account } from './account/entities/account.entity';

// @Module({
//   imports: [TypeOrmModule.forRoot(dataSourceOptions), AccountModule],
//   controllers: [AppController],
//   providers: [AppService],
// })

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-graphql-graphql-gmail.e.aivencloud.com',
      port: 10177,
      username: 'avnadmin',
      password: 'AVNS_Pq88DUcTUIgqlkmWz39',
      database: 'defaultdb',
      entities: [Account],
      synchronize: true,
    }),
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
