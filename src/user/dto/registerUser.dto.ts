import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  userName: string;

  @IsNotEmpty()
  password: string;
}
