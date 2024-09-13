import { Controller, Get } from '@nestjs/common';
import { GenService } from './gen.service';

@Controller('gen')
export class GenController {
  constructor(private service: GenService) {}

  @Get('user')
  genUser() {
    return this.service.genaraterUser();
  }

  @Get('user1')
  genUser1() {
    return this.service.gen1();
  }

  @Get('user2')
  genUser2() {
    return this.service.gen2();
  }

  @Get('user3')
  genUser3() {
    return this.service.gen3();
  }

  @Get('key_word_search')
  genKeyWordSearch() {
    return this.service.genKeyWordSearch();
  }

  @Get('junk-gmail')
  getRandomJunkGmail() {
    return this.service.getRandomJunkGmail();
  }
}
