import { Controller } from '@nestjs/common';
import { BaseController } from '../../common/base.controller';
import { AccountPlatformDto } from '../dto/platform/account-platform.dto';
import { AccountPlatform } from '../entities';
import { AccountPlatformService } from '../service/accountPlatform.service';

@Controller('account-platform')
export class AccountPlatformController extends BaseController<
  AccountPlatform,
  AccountPlatformDto
> {
  constructor(private readonly accountPlatformService: AccountPlatformService) {
    super(accountPlatformService.getPlatformService(), AccountPlatformDto);
  }
}
