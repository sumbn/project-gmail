import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AccountService {
  constructor(@InjectRepository(Account) private repo: Repository<Account>) {}

  async register(registerDto: RegisterDto): Promise<Account> {
    return this.repo.save(registerDto);
  }
}
