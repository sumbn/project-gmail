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
    // return this.service.getDataAndCombine();
  }

  @Get('getmail2')
  getMail2() {
    // return this.service.getDataAndCombine();
  }

  @Get('gen')
  genUser() {
    return this.service.genaraterUser();
  }

  @Get('gen1')
  genUser1() {
    return this.service.gen1();
  }

  @Get('gen2')
  genUser2() {
    return this.service.gen2();
  }

  @Get('gen3')
  genUser3() {
    return this.service.gen3();
  }
}
