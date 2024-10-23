import { Controller, Get } from '@nestjs/common';
import { AccountStatusServices } from '../service/accountStatus.service';

@Controller('account-status')
export class AccountStatusController {
  constructor(private service: AccountStatusServices) {}

  @Get()
  name() {
    return this.service.getHello();
  }
}
