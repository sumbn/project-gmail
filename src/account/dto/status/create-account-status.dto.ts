import { Expose } from 'class-transformer';
import { BaseDto } from '../../../common/base.dto';

export class CreateAccountStatusDto extends BaseDto {
  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  platformId: string;
}
