import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/registerUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(dataUser: RegisterUserDto): Promise<User> {
    return await this.userRepo.save(dataUser);
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
