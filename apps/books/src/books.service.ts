import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from '@app/contracts/books';
import { BooksRepository } from './books.repository';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}
  create(createBookDto: CreateBookDto) {
    if (this.booksRepository.findOne({ title: createBookDto.title })) {
      return { error: new HttpException('Book already exists', HttpStatus.CONFLICT) };
    }
    return this.booksRepository.create(createBookDto);
  }

  findAll() {
    return this.booksRepository.find({});
  }

  findOne(id: string) {
    return this.booksRepository.findOne({ id });
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return this.booksRepository.findOneAndUpdate({ id }, updateBookDto);
  }

  async remove(id: string) {
    const result = await this.booksRepository.delete({ id });
    return result.acknowledged && result.deletedCount > 0;
  }
}
