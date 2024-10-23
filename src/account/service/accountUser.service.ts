import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountUser } from '../entities';
import { Repository } from 'typeorm';
import { CreateAccountUserDto } from '../dto';

@Injectable()
export class AccountUserService {
  constructor(
    @InjectRepository(AccountUser)
    private readonly repo: Repository<AccountUser>,
  ) {}

  async insertUserToDB(
    data: CreateAccountUserDto,
  ): Promise<CreateAccountUserDto> {
    return this.repo.save(data);
  }
}
