import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BooksEntity } from './books.entity';
import { BooksDto } from './dtos/books.dto';
import { AuthorsService } from '../authors/authors.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BooksEntity)
    private booksRepository: Repository<BooksEntity>,
    private authorsService: AuthorsService,
  ) {}

  async create(dto: BooksDto): Promise<BooksEntity> {
    const author = this.booksRepository.create(dto);
    return await this.booksRepository.save(author);
  }

  async getAll(): Promise<BooksEntity[]> {
    return await this.booksRepository.find({ relations: ['author'] });
  }

  async getById(id: number): Promise<BooksEntity> {
    return await this.booksRepository.findOne({
      where: { id },
      relations: ['author'],
    });
  }

  async getByTitle(title: string): Promise<BooksEntity[]> {
    return await this.booksRepository.find({
      where: { title },
      relations: ['author'],
    });
  }

  async getByAuthor(surname: string): Promise<BooksEntity[]> {
    const author = await this.authorsService.getBySurname(surname);
    return await this.booksRepository.find({
      where: { author },
      relations: ['author'],
    });
  }

  async update(id: number, dto: BooksDto): Promise<BooksEntity> {
    await this.booksRepository.update(id, dto);
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    return book;
  }

  async assignAuthor(id: number, surname: string) {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    const author = await this.authorsService.getBySurname(surname);

    book.author = author;

    await this.booksRepository.save(book); // This object includes the author property with books

    // This object includes the author property without the books
    return await this.booksRepository.findOne({
      where: { id },
      relations: ['author'],
    });
  }

  async removeAuthor(id: number) {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    book.author = null;
    return await this.booksRepository.save(book);
  }

  async delete(id: number): Promise<void> {
    await this.booksRepository.delete(id);
  }
}
