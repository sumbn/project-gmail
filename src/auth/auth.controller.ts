import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterAuthDto } from './dto/auth.dto';
import { User } from '../user/entities/user.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponse } from './dto/loginResponse.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterAuthDto): Promise<User> {
    return await this.authService.register(registerUserDto);
  }

  @Post('login')
  @ApiResponse({ status: 201, description: 'Login successfully' })
  @ApiResponse({ status: 401, description: 'Login fail' })
  login(@Body() loginUserDto: LoginDto): Promise<LoginResponse> {
    return this.authService.login(loginUserDto);
  }
}
