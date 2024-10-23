import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async insertDb(data: CreateAccountPlatformDto): Promise<AccountPlatform> {
    try {
      return await this.repo.save(data);
    } catch (error) {
      if (error.code === '23505') {
        throw new HttpException(
          { message: 'Platform already exists' },
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(
        { message: 'An error occurred' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
