import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
