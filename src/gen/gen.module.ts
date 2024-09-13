import { Module } from '@nestjs/common';
import { GenController } from './gen.controller';
import { GenService } from './gen.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  KeyWordSearch,
  Password,
  Theme,
  UserInfoGen,
} from './entities/data.entity';
import { HotMail } from '../hotmail/entities/hotmail.entity';
import { JunkGmail } from './entities/junkGmail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserInfoGen,
      Theme,
      Password,
      HotMail,
      KeyWordSearch,
      JunkGmail,
    ]),
  ],
  controllers: [GenController],
  providers: [GenService],
})
export class GenModule {}
