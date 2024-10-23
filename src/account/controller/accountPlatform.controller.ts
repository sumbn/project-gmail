import { Body, Controller, Post } from '@nestjs/common';
import { AccountPlatformService } from '../service/accountPlatform.service';
import { CreateAccountPlatformDto } from '../dto';

@Controller('account-platform')
export class AccountPlatformController {
  constructor(private service: AccountPlatformService) {}

  @Post()
  insert(@Body() data: CreateAccountPlatformDto) {
    return this.service.insertDb(data);
  }
}
