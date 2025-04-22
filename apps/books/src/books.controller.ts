import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BooksService } from './books.service';
import { BOOKS_PATTERN, CreateBookDto, UpdateBookDto } from '@app/contracts/books';

@Controller()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @MessagePattern(BOOKS_PATTERN.CREATE)
  create(@Payload() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @MessagePattern(BOOKS_PATTERN.FIND_ALL)
  findAll() {
    return this.booksService.findAll();
  }

  @MessagePattern(BOOKS_PATTERN.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.booksService.findOne(id);
  }

  @MessagePattern(BOOKS_PATTERN.UPDATE)
  update(@Payload() updateBookDto: UpdateBookDto) {
    return this.booksService.update(updateBookDto.id, updateBookDto);
  }

  @MessagePattern(BOOKS_PATTERN.REMOVE)
  remove(@Payload() id: string) {
    return this.booksService.remove(id);
  }
}
