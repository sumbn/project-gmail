import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountPlatform, AccountStatus } from '../entities';
import { GenericService } from '../../common/mysql/base.service';
import { CreateAccountStatusDto } from '../dto';
import { AccountPlatformDto } from '../dto/platform/account-platform.dto';

@Injectable()
export class AccountStatusServices {
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

  private readonly statusService: GenericService<AccountStatus>;
  private readonly platformService: GenericService<AccountPlatform>;

  async insertToDB(
    data: Partial<CreateAccountStatusDto>,
  ): Promise<CreateAccountStatusDto> {
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
          platformId: platform.id, // Truyền cả đối tượng platform vào
        },
        CreateAccountStatusDto,
      );

      return status;
    } catch (error) {
      throw new Error(`Failed to insert account status: ${error.message}`);
    }
  }
}
