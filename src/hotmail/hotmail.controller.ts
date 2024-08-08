import { Controller, Get } from '@nestjs/common';
import { HotmailService } from './hotmail.service';

@Controller('hotmail')
export class HotmailController {
  constructor(private service: HotmailService) {}

  @Get()
  data() {
    return this.service.getMail();
  }
}
