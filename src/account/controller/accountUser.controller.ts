import { Controller, Post } from '@nestjs/common';
import { AccountUserService } from '../service/accountUser.service';

@Controller('account-user')
export class AccountUserController {
  constructor(private service: AccountUserService) {}

  @Post()
  async createUser() {
    return this.service.saveAccountUser();
  }
}
