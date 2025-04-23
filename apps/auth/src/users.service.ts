import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '@app/common';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    const result = await this.userRepository.find({
      email: createUserDto.email,
    });
    if (result.length > 0) {
      return {
        error: new HttpException('User already exists', HttpStatus.CONFLICT),
      };
    }
    const user = await this.userRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
    return user;
  }
  async findOne(id: string) {
    const result = await this.userRepository.findOne({ _id: id });
    return result;
  }
  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return {
        error: new UnauthorizedException('Credentials are not valid.'),
      };
    }
    return user;
  }
  findAll() {
    return this.userRepository.find({});
  }
}
