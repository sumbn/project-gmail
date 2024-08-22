import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterAccountDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
