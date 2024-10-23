import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterAuthDto } from './dto/auth.dto';
import { hash, compare } from 'bcrypt';
import { JwtPayload } from './dto/jwtPayload.dto';
import { LoginResponse } from './dto/loginResponse.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(userData: RegisterAuthDto): Promise<User> {
    const user = await this.userRepo.findOne({
      where: {
        email: userData.email,
      },
    });

    if (user) {
      throw new HttpException(
        { message: 'Email already Exist' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPass = await hash(userData.password, 10);

    const result = await this.userRepo.save({
      ...userData,
      password: hashPass,
    });

    return result;
  }

  async login(userData: LoginDto): Promise<LoginResponse> {
    const user = await this.userRepo.findOne({
      where: {
        email: userData.email,
      },
    });

    if (!user) {
      throw new HttpException(
        { message: 'Account not found' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const verify = await compare(userData.password, user.password);

    if (!verify) {
      throw new HttpException(
        { message: 'Incorrect password' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    //gen
    const payload: JwtPayload = {
      id: user.id,
      name: user.userName,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: '12345',
      expiresIn: '60s',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: '12345',
      expiresIn: '7d',
    });

    return {
      user: {
        name: user.userName,
        email: user.email,
      },
      accessToken,
      refreshToken,
    };
  }

  async verifyToken(token: string): Promise<JwtPayload | Error> {
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: '12345',
      });
      return decoded;
    } catch (error) {
      throw new HttpException(
        { message: 'Invalid or expired token' },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
