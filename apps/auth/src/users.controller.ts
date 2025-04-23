import { Controller, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AUTH_PATTERN, LoginDto } from '@app/common/auth';
import { CreateUserDto } from '@app/common/auth';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(AUTH_PATTERN.USER_FIND_ALL)
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern(AUTH_PATTERN.USER_CREATE)
  async create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @UseGuards(JwtGuard)
  @MessagePattern(AUTH_PATTERN.USER_VALIDATE)
  async validate(@Payload() loginDto: LoginDto) {
    const { email, password } = loginDto;
    return this.usersService.validateUser(email, password);
  }
}
