import { Expose } from 'class-transformer';
import { BaseDto } from '../../../common/base.dto';

export class AccountPlatformDto extends BaseDto {
  @Expose()
  name: string;
}
