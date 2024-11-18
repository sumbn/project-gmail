import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import {
  AccountPlatform,
  AccountStatus,
  AccountUser,
  AccountUserPlatform,
} from './entities';
import { AccountStatusController } from './controller/accountStatus.controller';
import { AccountStatusServices } from './service/accountStatus.service';
import { AccountPlatformController } from './controller/accountPlatform.controller';
import { AccountPlatformService } from './service/accountPlatform.service';
import { AccountUserController } from './controller/accountUser.controller';
import { AccountUserService } from './service/accountUser.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountPlatform,
      AccountStatus,
      AccountUser,
      AccountUserPlatform,
    ]),
    AuthModule,
  ],
  controllers: [
    AccountController,
    AccountStatusController,
    AccountPlatformController,
    AccountUserController,
  ],
  providers: [
    AccountService,
    AccountStatusServices,
    AccountPlatformService,
    AccountUserService,
  ],
  exports: [AccountUserService],
})
export class AccountModule {}
