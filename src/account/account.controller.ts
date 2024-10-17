import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RegisterAccountDto } from './dto/registerAccount.dto';
import { AccountService } from './account.service';
import { Account } from './entities/account.entity';
import { FilterAccountDto } from './dto/filter-account.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Account')
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
  getMail(@Query() query: FilterAccountDto) {
    // return this.service.findAll(query);
    return this.service.paginationAndFilter(query);
  }
}
