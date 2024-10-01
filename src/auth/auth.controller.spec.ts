import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthController,
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call register service and return a user', async () => {
    const userData = {
      email: 'test@gmail.com',
      userName: 'test01',
      password: '123456',
    };

    const resData = { ...userData, id: 1 };

    mockAuthService.register.mockResolvedValue(resData);
    const res = await controller.register(userData);
    expect(res).toEqual(resData);
    expect(mockAuthService.register).toHaveBeenCalledWith(userData);
  });
});
