import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RegisterAccountDto } from './dto/registerAccount.dto';
import { AccountService } from './account.service';
import { Account } from './entities/account.entity';

@Controller('account')
export class AccountController {
  constructor(private service: AccountService) {}

  @Post('register')
  register(@Body() body: RegisterAccountDto): Promise<Account> {
    return this.service.register(body);
  }

  @Get('gmail-feed')
  gmailToFeed() {
    return this.service.getMailToFeed();
  }

  @Patch('check-account/:id')
  updateLiveGmail(@Param('id') id: string) {
    return this.service.updateLive(Number(id));
  }

  @Get()
  getMail() {
    return this.service.findAll();
  }
}
