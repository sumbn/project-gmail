import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/registerUser.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(dataUser: RegisterUserDto): Promise<RegisterUserDto> {
    try {
      const user = await this.userRepo.save(dataUser);
      return plainToInstance(RegisterUserDto, user, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
        throw new ConflictException('Email already exists');
      }
      throw error; // Re-throw other errors if they're not duplicate errors
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async findOne(identifier: number | string): Promise<User> {
    if (typeof identifier === 'number') {
      return await this.userRepo.findOne({ where: { id: identifier } });
    } else {
      return await this.userRepo.findOne({ where: { email: identifier } });
    }
  }
}
