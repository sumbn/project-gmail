import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterAuthDto } from './dto/auth.dto';
import { User } from '../user/entities/user.entity';
import { LoginResponse } from './models/auth.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterAuthDto): Promise<User> {
    return await this.authService.register(registerUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginDto): Promise<LoginResponse> {
    return this.authService.login(loginUserDto);
  }
}