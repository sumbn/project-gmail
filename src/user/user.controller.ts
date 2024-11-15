import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { BaseController } from '../common/base.controller';
import { User } from './entities/user.entity';
import { UserDto } from './dto/registerUser.dto';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController extends BaseController<User, UserDto> {
  constructor(private readonly userService: UserService) {
    super(userService.getuserService(), UserDto);
  }
}
