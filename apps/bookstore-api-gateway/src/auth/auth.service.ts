import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE } from './constant';
import { Response } from 'express';
import { AUTH_PATTERN, CreateUserDto, LoginDto } from '@app/common';
import { catchError, lastValueFrom, map } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) {}
  getAllUsers() {
    return this.authClient.send(AUTH_PATTERN.USER_FIND_ALL, {});
  }
  async login(loginDto: LoginDto, response: Response) {
    const result = this.authClient.send(AUTH_PATTERN.LOGIN, loginDto).pipe(
      map((r) => {
        return r;
      }),
      catchError((error) => {
        throw error;
      })
    );
    
    const token = await lastValueFrom(result);

    response.cookie('Authentication', token.access_token, {
      httpOnly: true,      
      expires: new Date(token.expires),
    });
  }
  register(createUserDto: CreateUserDto) {    
    return this.authClient.send(AUTH_PATTERN.USER_CREATE, createUserDto);
  }
}
