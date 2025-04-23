import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BookDto, CreateBookDto, UpdateBookDto } from './dto';
import {
  BOOKS_PATTERN,
  ServiceResponseDto,
  ServiceBookDto,
  CreateBookDto as ServiceCreateBookDto,
  UpdateBookDto as ServiceUpdateBookDto,
} from '@app/common';
import { map, catchError, pipe } from 'rxjs';
import { BOOKS_SERVICE } from './constant';

@Injectable()
export class BooksService {
  constructor(@Inject(BOOKS_SERVICE) private bookClient: ClientProxy) {}

  private mapBooksDto(bookDto: ServiceResponseDto<ServiceBookDto>): BookDto {
    const {
      data: { _id, title },
    } = bookDto;
    return {
      id: _id,
      title: title,
    };
  }

  private handleResponse() {
    return pipe(
      map((response: ServiceResponseDto<ServiceBookDto>) => {
        if (response.error) {
          throw new HttpException(
            response.error.message || 'An error occurred',
            response.error.status || HttpStatus.BAD_REQUEST
          );
        }
        return this.mapBooksDto(response);
      }),
      catchError((error) => {
        console.error('Error in BooksService:', error);
        throw error;
      })
    );
  }

  create(createBookDto: CreateBookDto) {
    return this.bookClient
      .send<
        ServiceResponseDto<ServiceBookDto>,
        ServiceCreateBookDto
      >(BOOKS_PATTERN.CREATE, createBookDto)
      .pipe(this.handleResponse());
  }

  findAll() {
    return this.bookClient.send<ServiceBookDto>(BOOKS_PATTERN.FIND_ALL, {});
  }

  findOne(id: string) {
    return this.bookClient.send<ServiceBookDto>(BOOKS_PATTERN.FIND_ONE, id);
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return this.bookClient
      .send<
        ServiceResponseDto<ServiceBookDto>,
        ServiceUpdateBookDto
      >(BOOKS_PATTERN.UPDATE, { id, ...updateBookDto })
      .pipe(this.handleResponse());
  }

  remove(id: string) {
    return this.bookClient.send(BOOKS_PATTERN.REMOVE, id);
  }
}
