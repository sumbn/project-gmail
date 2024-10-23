import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountPlatform, AccountStatus } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountStatusDto } from '../dto';
import { Repository } from 'typeorm';

@Injectable()
export class AccountStatusServices {
  constructor(
    @InjectRepository(AccountStatus)
    private readonly repo: Repository<AccountStatus>,
    @InjectRepository(AccountPlatform)
    private readonly platformRepository: Repository<AccountPlatform>,
  ) {}

  async insertToDB(data: CreateAccountStatusDto): Promise<AccountStatus> {
    let platform = null;

    if (data.platformId) {
      platform = await this.platformRepository.findOne({
        where: { id: data.platformId },
      });
      if (!platform) {
        throw new HttpException(
          { message: 'Platform not found' },
          HttpStatus.NOT_FOUND,
        );
      }
    }

    const status = this.repo.create({
      name: data.name,
      description: data.description,
      platform: platform,
    });

    return this.repo.save(status);
  }
}
