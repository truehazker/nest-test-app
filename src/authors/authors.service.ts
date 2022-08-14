import { Injectable } from '@nestjs/common';
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
    await this.authorsRepository.update(id, dto);
    const author = await this.authorsRepository.findOne({ where: { id } });
    return author;
  }

  async delete(id: number): Promise<void> {
    await this.authorsRepository.delete(id);
  }
}
