import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { AccountUserPlatformDto, PaginationAccountDto } from './dto';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private service: AccountService) {}

  @Post('register')
  register(@Body() body: AccountUserPlatformDto) {
    return this.service.createUserPlatformAccount(body);
  }

  @Get()
  getMail(@Query() query: PaginationAccountDto) {
    return this.service.paginationAndFilter(query);
  }

  // @Get('gmail-feed')
  // gmailToFeed() {
  //   return this.service.getMailToFeed();
  // }

  // @Patch('check-account/:id')
  // updateLiveGmail(@Param('id') id: string) {
  //   return this.service.updateLive(Number(id));
  // }
}
