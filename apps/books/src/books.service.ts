import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from '@app/contracts/books';
import { BooksRepository } from './books.repository';
import { AuthorsRepository } from './authors.repository';

@Injectable()
export class BooksService {
  constructor(
    private readonly booksRepository: BooksRepository,
    private readonly authorsRepository: AuthorsRepository
  ) {}

  async create(createBookDto: CreateBookDto) {
    const result = await this.booksRepository.find({
      title: createBookDto.title,
    });
    if (result.length > 0) {
      return {
        error: new HttpException('Book already exists', HttpStatus.CONFLICT),
      };
    }

    const authors = await this.authorsRepository.find({
      name: createBookDto.author,
    });
    let author;
    if (authors.length > 0) {
      author = authors[0];
    } else {
      author = await this.authorsRepository.create({
        name: createBookDto.author,
      });
    }

    const createdBook = await this.booksRepository.create({
      ...createBookDto,
      author: author,
    });
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
      let authorId = undefined;
      if (updateBookDto.author) {
        let author = await this.authorsRepository.findOne({
          name: updateBookDto.author,
        });
        if (!author) {
          author = await this.authorsRepository.create({
            name: updateBookDto.author,
          });
        }
        authorId = author._id;
      }

      const result = await this.booksRepository.findOneAndUpdate(
        { _id: id },
        { ...updateBookDto, ...(authorId && { author: authorId }) }
      );
      return { data: result };
    } catch (error) {
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
