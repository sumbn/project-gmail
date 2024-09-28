import { Controller, Get, Query } from '@nestjs/common';
import { HotmailService } from './hotmail.service';
import { OTPDto } from './dto/get-otp.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Hotmail')
@Controller('hotmail')
export class HotmailController {
  constructor(private service: HotmailService) {}

  @Get()
  data() {
    return this.service.getMail();
  }

  @Get('otp')
  checkEmail(@Query() body: OTPDto) {
    return this.service.checkMail(body.email, body.password);
  }
}
