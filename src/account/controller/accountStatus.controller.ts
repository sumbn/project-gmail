import { Body, Controller, Post } from '@nestjs/common';
import { BaseController } from '../../common/base.controller';
import { AccountStatusDto } from '../dto';
import { AccountStatus } from '../entities';
import { AccountStatusServices } from '../service/accountStatus.service';

@Controller('account-status')
export class AccountStatusController extends BaseController<
  AccountStatus,
  AccountStatusDto
> {
  constructor(private statusService: AccountStatusServices) {
    super(statusService.getStatusService(), AccountStatusDto);
  }

  @Post()
  async create(
    @Body() dto: Partial<AccountStatusDto>,
  ): Promise<AccountStatusDto> {
    return this.statusService.createNewStatus(dto);
  }
}
