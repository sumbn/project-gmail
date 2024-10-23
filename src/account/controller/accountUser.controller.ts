import { Body, Controller, Post } from '@nestjs/common';
import { AccountUserService } from '../service/accountUser.service';
import { CreateAccountUserDto } from '../dto';

@Controller('account-user')
export class AccountUserController {
  constructor(private service: AccountUserService) {}

  @Post()
  async createUser(@Body() data: CreateAccountUserDto) {
    return this.service.insertUserToDB(data);
  }
}
