import { Injectable } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UsersService {
  private users: UserDTO[] = [
    {
      id: 1,
      firstname: 'saman',
      lastname: 'kefayat',
      age: 40,
    },
    {
      id: 2,
      firstname: 'sam',
      lastname: 'kefayat',
      age: 25,
    },
    {
      id: 3,
      firstname: 'john',
      lastname: 'johns',
      age: 55,
    },
  ];
  findAll() {
    return this.users;
  }
}
