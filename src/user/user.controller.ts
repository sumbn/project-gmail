import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Post('create')
  register(@Body() body: RegisterUserDto): Promise<User> {
    return this.service.create(body);
  }

  @Get('id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Get()
  getUsers(){
    return this.service.findAll()
  }
}
