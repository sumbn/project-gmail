import { Controller } from '@nestjs/common';
import { AccountStatusServices } from '../service/accountStatus.service';

@Controller('account-status')
export class AccountStatusController {
  constructor(private service: AccountStatusServices) {}

  // @Post()
  // name(@Body() data: CreateAccountStatusDto) {
  //   return this.service.insertToDB(data);
  // }
}
