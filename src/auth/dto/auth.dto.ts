import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterAuthDto {
  @IsEmail()
  email: string;

  @IsOptional()
  userName: string;

  @IsNotEmpty()
  password: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
