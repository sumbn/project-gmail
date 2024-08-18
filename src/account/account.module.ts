import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Password, Theme, UserInfoGen } from './entities/data.entity';
// import { Address, FirstName, LastName, Password } from './entities/data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, UserInfoGen, Theme, Password])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
