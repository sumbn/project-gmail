import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountUser } from '../entities';

@Injectable()
export class AccountUserService {
  constructor(
    @InjectRepository(AccountUser)
    private readonly repo: Repository<AccountUser>,
  ) {}

  async insertUserToDB(): Promise<any> {
    const user = new AccountUser();
    return this.repo.save(user);
  }
}
