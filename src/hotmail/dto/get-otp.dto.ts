import { IsEmail, IsNotEmpty } from 'class-validator';

export class OTPDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
