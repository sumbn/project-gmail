import { Module } from '@nestjs/common';
import { HotmailController } from './hotmail.controller';
import { HotmailService } from './hotmail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotMail } from './entities/hotmail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HotMail])],
  controllers: [HotmailController],
  providers: [HotmailService],
})
export class HotmailModule {}
