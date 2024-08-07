import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Address, FirstName, LastName, Password } from './entities/data.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, Address, FirstName, LastName, Password]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
