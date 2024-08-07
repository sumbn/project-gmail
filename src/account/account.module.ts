import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Address, FirstName, LastName } from './entities/data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Address, FirstName, LastName])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
