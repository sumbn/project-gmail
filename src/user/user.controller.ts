import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Post('create')
  register(@Body() body: RegisterUserDto): Promise<RegisterUserDto> {
    return this.service.saveUser(body);
  }

  // @Get('id')
  // getUser(@Param('id') id: string) {
  //   return this.service.findOne(id);
  // }

  // @Get()
  // getUsers() {
  //   return this.service.findAll();
  // }
}
