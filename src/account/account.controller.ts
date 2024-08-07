import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AccountService } from './account.service';
import { Account } from './entities/account.entity';

@Controller('account')
export class AccountController {
  constructor(private service: AccountService) {}

  @Post('register')
  register(@Body() body: RegisterDto): Promise<Account> {
    return this.service.register(body);
  }

  @Get('getmail')
  getMail() {
    return this.service.getDataAndCombine();
  }
}
