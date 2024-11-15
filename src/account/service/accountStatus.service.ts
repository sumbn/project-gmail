import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountPlatform, AccountStatus } from '../entities';
import { GenericService } from '../../common/mysql/base.service';
import { AccountStatusDto } from '../dto';
import { AccountPlatformDto } from '../dto/platform/account-platform.dto';

@Injectable()
export class AccountStatusServices {
  private readonly statusService: GenericService<AccountStatus>;
  private readonly platformService: GenericService<AccountPlatform>;
  constructor(
    @InjectRepository(AccountStatus)
    private readonly repo: Repository<AccountStatus>,
    @InjectRepository(AccountPlatform)
    private readonly platformRepository: Repository<AccountPlatform>,
  ) {
    this.statusService = new GenericService(repo, AccountStatus);
    this.platformService = new GenericService(
      platformRepository,
      AccountPlatform,
    );
  }

  getStatusService(): GenericService<AccountStatus> {
    return this.statusService;
  }

  async createNewStatus(
    data: Partial<AccountStatusDto>,
  ): Promise<AccountStatusDto> {
    try {
      let platform: AccountPlatformDto | undefined;

      if (data.platformId) {
        platform = await this.platformService.findOne(
          data.platformId,
          AccountPlatformDto,
        );
        if (!platform) {
          throw new Error(`Platform with id ${data.platformId} not found`);
        }
      }

      const status = await this.statusService.save(
        {
          name: data.name,
          description: data.description,
          platformId: platform.id,
        },
        AccountStatusDto,
      );

      return status;
    } catch (error) {
      throw new Error(`Failed to insert account status: ${error.message}`);
    }
  }
}
