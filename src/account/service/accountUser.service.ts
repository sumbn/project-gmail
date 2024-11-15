import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountUser } from '../entities';
import { GenericService } from '../../common/mysql/base.service';

@Injectable()
export class AccountUserService {
  private readonly accounUserService: GenericService<AccountUser>;

  constructor(
    @InjectRepository(AccountUser)
    private readonly repo: Repository<AccountUser>,
  ) {
    this.accounUserService = new GenericService(repo, AccountUser);
  }

  getPlatformService(): GenericService<AccountUser> {
    return this.accounUserService;
  }

  async saveAccountUser(): Promise<any> {
    const user = new AccountUser();
    return this.repo.save(user);
  }
}
