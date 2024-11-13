import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterUserDto {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsOptional()
  userName: string;

  @IsNotEmpty()
  password: string;
}
