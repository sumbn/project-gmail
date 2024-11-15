import { Expose } from 'class-transformer';
import { BaseDto } from '../../../common/base.dto';

export class AccountStatusDto extends BaseDto {
  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  platformId: string;
}
