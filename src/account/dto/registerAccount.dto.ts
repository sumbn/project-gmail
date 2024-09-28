import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterAccountDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: false })
  phoneNumber?: string;

  @ApiProperty({ required: false })
  phoneModel?: string;

  @ApiProperty({ required: false })
  isLive?: boolean;

  @ApiProperty({ required: false })
  isVerify?: boolean;

  @ApiProperty({ required: false })
  recoveryMail?: string;

  @ApiProperty({ required: false })
  createdBy?: string;
}
