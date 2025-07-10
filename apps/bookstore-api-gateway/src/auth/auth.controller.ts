import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from '@app/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get()
  getAllUsers() {
    return this.authService.getAllUsers();
  }
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
  @Post('login')
  login(@Body() loginDto: LoginDto,  @Res({ passthrough: true }) response: Response) {
    return this.authService.login(loginDto, response);
  }
}
