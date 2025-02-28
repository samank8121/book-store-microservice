import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICE } from './constant';

@Injectable()
export class UsersService {
  constructor(@Inject(USER_SERVICE) private userClient: ClientProxy) {}
  findAll() {
    return this.userClient.send('users.findAll', {});
  }
}
