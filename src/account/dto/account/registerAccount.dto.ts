import { IsNotEmpty } from 'class-validator';

export class RegisterAccountDto {
  email: string;

  platformId: string;

  @IsNotEmpty({ message: 'username is required' })
  username: string;

  password: string;

  statusId: string;
}
