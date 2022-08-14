import { HttpException, Injectable } from '@nestjs/common';
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
    // We don't need to check if the book already exists
    // Because same title could be used by different authors
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
    const book = await this.getById(id);

    if (!(await this.getById(id)))
      throw new HttpException('Book not found', 404);

    const modified = await this.booksRepository.merge(book, dto);
    await this.booksRepository.save(modified);

    return await this.booksRepository.findOne({ where: { id } });
  }

  async assignAuthor(id: number, surname: string) {
    const book = await this.getById(id);

    if (!book) throw new HttpException('Book not found', 404);

    const author = await this.authorsService.getBySurname(surname);

    if (!author) throw new HttpException('Author not found', 404);

    book.author = author;

    await this.booksRepository.save(book); // This object includes the author property with books

    // This object includes the author property without the books
    return await this.booksRepository.findOne({
      where: { id },
      relations: ['author'],
    });
  }

  async removeAuthor(id: number) {
    const book = await this.getById(id);

    if (!book) throw new HttpException('Book not found', 404);

    book.author = null;
    return await this.booksRepository.save(book);
  }

  async delete(id: number): Promise<void> {
    const book = await this.getById(id);
    if (!book) throw new HttpException('Book not found', 404);
    await this.booksRepository.delete(id);
  }
}
