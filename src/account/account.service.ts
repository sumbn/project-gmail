import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import { RegisterAccountDto } from './dto/registerAccount.dto';

@Injectable()
export class AccountService {
  constructor(@InjectRepository(Account) private repo: Repository<Account>) {}

  async register(registerDto: RegisterAccountDto): Promise<Account> {
    return this.repo.save(registerDto);
  }

  async findAll(): Promise<Account[]> {
    return await this.repo.find();
  }
}
