import { Injectable } from '@nestjs/common';
import { AccountStatus } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AccountStatusServices {
  constructor(@InjectRepository(AccountStatus) private repo: AccountStatus) {}

  getHello() {
    return 'hello abc';
  }
}
