import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/registerUser.dto';
import { GenericService } from '../common/mysql/base.service';

@Injectable()
export class UserService {
  private readonly userService: GenericService<User>;
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {
    this.userService = new GenericService(userRepo, User);
  }

  getuserService(): GenericService<User> {
    return this.userService;
  }

  async saveUser(dto: UserDto): Promise<UserDto> {
    return this.userService.save(dto, UserDto);
  }
}

// @Injectable()
// export class UserService {
//   private readonly userService: GenericService<User>;

//   constructor(
//     @InjectRepository(User) userRepo: Repository<User>,
//   ) {
//     this.userService = new GenericService<User>(userRepo);
//   }

//   async saveUser(dto: RegisterUserDto): Promise<User> {
//     return this.userService.save(dto);
//   }

//   async getAllUsers(): Promise<User[]> {
//     return this.userService.findAll();
//   }
// }
