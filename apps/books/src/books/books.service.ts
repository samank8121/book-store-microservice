import { Injectable } from '@nestjs/common';
import { BookDto, CreateBookDto, UpdateBookDto } from '@app/contracts/books';

@Injectable()
export class BooksService {
  private books: BookDto[] = [
    { id: 1, title: 'title 1', author: 'author 1', rating: 3.9 },
    { id: 2, title: 'title 2', author: 'author 2', rating: 4.5 },
  ];
  create(createBookDto: CreateBookDto) {
    const newBook: BookDto = {
      ...createBookDto,
      id: this.books.length + 1,
    };
    this.books.push(newBook);
    return newBook;
  }

  findAll() {
    return this.books;
  }

  findOne(id: number) {
    return this.books.filter((b) => b.id === id);
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    const index = this.books.findIndex((b) => b.id === id);
    if (index === -1) {
      throw new Error(`Book with id ${id} not found`);
    }
  
    this.books[index] = { ...this.books[index], ...updateBookDto };
    return this.books[index];
  }

  remove(id: number) {
    this.books = this.books.filter((b) => b.id !== id);
    return this.books;
  }
}
