import { Body, Controller, Get, Post } from '@nestjs/common';
import { HotmailService } from './hotmail.service';
import { OTPDto } from './dto/get-otp.dto';

@Controller('hotmail')
export class HotmailController {
  constructor(private service: HotmailService) {}

  @Get()
  data() {
    return this.service.getMail();
  }

  @Post('otp')
  checkEmail(@Body() body: OTPDto) {
    return this.service.checkMail(body.email, body.password);
  }
}
