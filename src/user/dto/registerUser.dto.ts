import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { BaseDto } from '../../common/base.dto';

export class RegisterUserDto extends BaseDto {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsOptional()
  userName: string;

  @IsNotEmpty()
  password: string;
}
