import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AuthService', function () {
  let service: AuthService;
  let jwtService: JwtService;
  let userRepo: Repository<User>;

  const userData = {
    email: 'test@gmail.com',
    password: '123456',
    userName: 'test01',
  };

  const mockUserRepo = {
    create: jest.fn().mockResolvedValue(userData),
    save: jest.fn().mockResolvedValue(userData),
    findOne: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  jest.mock('bcrypt');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepo,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Register API', () => {
    it('should register successfully', async () => {
      (mockUserRepo.findOne as jest.Mock).mockResolvedValueOnce(null);
      const hasSpy = jest
        .spyOn(bcrypt, 'hash')
        .mockResolvedValue('hashedPassword');
      const user = await service.register(userData);
      expect(user).toEqual(userData);
      expect(hasSpy).toHaveBeenCalledTimes(1);
      expect(mockUserRepo.findOne).toHaveBeenCalledWith({
        where: {
          email: 'test@gmail.com',
        },
      });
      expect(mockUserRepo.save).toHaveBeenCalledWith({
        ...userData,
        password: 'hashedPassword',
      });
      hasSpy.mockRestore();
    });

    it('should register fail and throw exception', async () => {
      (mockUserRepo.findOne as jest.Mock).mockResolvedValueOnce(userData);
      // const user = await service.register(userData);

      await expect(service.register(userData)).rejects.toThrow(
        new HttpException('Email already Exist', HttpStatus.BAD_REQUEST),
      );

      expect(mockUserRepo.findOne).toHaveBeenCalledWith({
        where: {
          email: 'test@gmail.com',
        },
      });
    });
  });

  describe('Login API', () => {
    it('should login successfully and return accestoken and refreshToken', async () => {
      (mockUserRepo.findOne as jest.Mock).mockResolvedValueOnce(userData);
      const compareSpy = jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      (mockJwtService.signAsync as jest.Mock)
        .mockResolvedValueOnce('accessToken')
        .mockResolvedValueOnce('refreshToken');
      const res = await service.login({
        email: 'test@gmail.com',
        password: '123456',
      });

      expect(res).toEqual({
        user: {
          name: userData.userName,
          email: userData.email,
        },
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });

      expect(mockJwtService.signAsync).toHaveBeenCalledTimes(2);
      compareSpy.mockRestore();
    });

    it('should throw exception if user not found', async () => {
      (mockUserRepo.findOne as jest.Mock).mockResolvedValueOnce(null);
      await expect(
        service.login({ email: 'test@gmail.com', password: '123456' }),
      ).rejects.toThrow(
        new HttpException(
          { message: 'Account not found' },
          HttpStatus.UNAUTHORIZED,
        ),
      );
      expect(mockUserRepo.findOne).toHaveBeenCalled();
    });

    it('should throw exception if password is incorrect', async () => {
      (mockUserRepo.findOne as jest.Mock).mockResolvedValueOnce(userData);
      const compareSpy = jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
      await expect(
        service.login({ email: 'test@gmail.com', password: '123456' }),
      ).rejects.toThrow(
        new HttpException(
          { message: 'Incorrect password' },
          HttpStatus.UNAUTHORIZED,
        ),
      );
      compareSpy.mockRestore();
    });
  });
});
