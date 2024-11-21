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

  firstName: string;

  lastName: string;

  statusId: string;

  phoneModel: string;

  phoneId: string;

  createdBy: string;
}
