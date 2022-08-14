import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorsEntity } from './authors.entity';
import { AuthorsDto } from './dtos/authors.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(AuthorsEntity)
    private authorsRepository: Repository<AuthorsEntity>,
  ) {}

  async create(dto: AuthorsDto): Promise<AuthorsEntity> {
    const twin = await this.authorsRepository.findOne({
      where: { surname: dto.surname },
    });
    if (twin) throw new HttpException('Author already exists', 409);
    const author = this.authorsRepository.create(dto);
    return await this.authorsRepository.save(author);
  }

  async getAll(): Promise<AuthorsEntity[]> {
    return await this.authorsRepository.find({ relations: ['books'] });
  }

  async getById(id: number): Promise<AuthorsEntity> {
    return await this.authorsRepository.findOne({
      where: { id },
      relations: ['books'],
    });
  }

  async getBySurname(surname: string): Promise<AuthorsEntity> {
    return await this.authorsRepository.findOne({
      where: { surname },
      relations: ['books'],
    });
  }

  async update(id: number, dto: AuthorsDto): Promise<AuthorsEntity> {
    const author = await this.getById(id);

    if (!(await this.getById(id)))
      throw new HttpException('Book not found', 404);

    const modified = await this.authorsRepository.merge(author, dto);
    await this.authorsRepository.save(modified);

    return await this.authorsRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    const author = await this.getById(id);
    if (!author) throw new HttpException('Author not found', 404);
    await this.authorsRepository.delete(id);
  }
}
