import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountPlatform } from '../entities';
import { Repository } from 'typeorm';
import { CreateAccountPlatformDto } from '../dto';

@Injectable()
export class AccountPlatformService {
  constructor(
    @InjectRepository(AccountPlatform)
    private repo: Repository<AccountPlatform>,
  ) {}

  async insertDb(data: CreateAccountPlatformDto) {
    return this.repo.save(data);
  }
}
