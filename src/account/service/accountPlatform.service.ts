import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericService } from '../../common/mysql/base.service';
import { AccountPlatformDto } from '../dto/platform/account-platform.dto';
import { AccountPlatform } from '../entities';

@Injectable()
export class AccountPlatformService {
  private readonly platformService: GenericService<AccountPlatform>;
  constructor(
    @InjectRepository(AccountPlatform)
    private repo: Repository<AccountPlatform>,
  ) {
    this.platformService = new GenericService(repo, AccountPlatform);
  }

  getPlatformService(): GenericService<AccountPlatform> {
    return this.platformService;
  }

  async insertDb(data: AccountPlatformDto): Promise<AccountPlatformDto> {
    return this.platformService.save(data, AccountPlatformDto);
  }
}
