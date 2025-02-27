import { Inject, Injectable } from '@nestjs/common';
import { BOOKS_PATTERN } from '@app/contracts/books';
import { ClientProxy } from '@nestjs/microservices';
import { BookDto, CreateBookDto, UpdateBookDto } from './dto';
import {
  BookDto as ServiceBookDto,
  CreateBookDto as ServiceCreateBookDto,
  UpdateBookDto as ServiceUpdateBookDto,
} from '@app/contracts/books';
import { map } from 'rxjs';
import { BOOKS_SERVICE } from './constant';

@Injectable()
export class BooksService {
  constructor(@Inject(BOOKS_SERVICE) private bookClient: ClientProxy) {}
  private mapBooksDto(bookDto: ServiceBookDto): BookDto {
    return {
      id: bookDto.id,
      title: bookDto.title,
    };
  }
  create(createBookDto: CreateBookDto) {
    return this.bookClient
      .send<
        ServiceBookDto,
        ServiceCreateBookDto
      >(BOOKS_PATTERN.CREATE, createBookDto)
      .pipe(map(this.mapBooksDto));
  }

  findAll() {
    return this.bookClient.send<ServiceBookDto>(BOOKS_PATTERN.FIND_ALL, {});
  }

  findOne(id: number) {
    return this.bookClient.send<ServiceBookDto>(BOOKS_PATTERN.FIND_ONE, id);
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.bookClient.send<ServiceBookDto, ServiceUpdateBookDto>(
      BOOKS_PATTERN.UPDATE,
      { id, ...updateBookDto }
    );
  }

  remove(id: number) {
    return this.bookClient.send(BOOKS_PATTERN.REMOVE, id);
  }
}
