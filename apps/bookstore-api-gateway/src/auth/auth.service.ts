import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE } from './constant';

@Injectable()
export class AuthService {
    constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) {}
    findAll() {
        return this.authClient.send('users.findAll', {});
    }
}
