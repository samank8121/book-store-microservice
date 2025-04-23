import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from '@app/contracts/books';
import { BooksRepository } from './books.repository';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}
  async create(createBookDto: CreateBookDto) {
    const result = await this.booksRepository.find({
      title: createBookDto.title,
    });
    if (result.length > 0) {
      return {
        error: new HttpException('Book already exists', HttpStatus.CONFLICT),
      };
    }
    const createdBook = await this.booksRepository.create(createBookDto);
    return { data: createdBook };
  }

  findAll() {
    return this.booksRepository.find({});
  }

  findOne(id: string) {
    return this.booksRepository.findOne({ _id: id });
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    try {
      const result = await this.booksRepository.findOneAndUpdate({ _id: id }, updateBookDto);
      return { data: result };
    }
    catch (error) {
      return {
        error: new HttpException(error.message, error.status),
      };
    }
  }

  async remove(id: string) {
    const result = await this.booksRepository.delete({ _id: id });
    return result.acknowledged && result.deletedCount > 0;
  }
}
