import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { AccountUserPlatformDto } from './dto';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private service: AccountService) {}

  @Post('register')
  register(@Body() body: AccountUserPlatformDto) {
    return this.service.createUserPlatformAccount(body);
  }

  // @Get()
  // getMail(@Query(new ValidationPipe()) query: FilterAccountDto) {
  //   return this.service.paginationAndFilter(query);
  // }

  // @Post('register')
  // register(@Body() body: RegisterAccountDto): Promise<GmailAccount> {
  //   return this.service.register(body);
  // }

  // @Get('gmail-feed')
  // gmailToFeed() {
  //   return this.service.getMailToFeed();
  // }

  // @Patch('check-account/:id')
  // updateLiveGmail(@Param('id') id: string) {
  //   return this.service.updateLive(Number(id));
  // }
}
