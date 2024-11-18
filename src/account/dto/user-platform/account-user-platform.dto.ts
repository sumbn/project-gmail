import { IsNotEmpty } from 'class-validator';
import { BaseDto } from '../../../common/base.dto';

export class AccountUserPlatformDto extends BaseDto {
  email: string;

  @IsNotEmpty({ message: 'platformId is not empty' })
  platformId: string;

  @IsNotEmpty({ message: 'username is not empty' })
  username: string;

  @IsNotEmpty({ message: 'password is not empty' })
  password: string;

  @IsNotEmpty({ message: 'statusId is not empty' })
  statusId: string;
}
