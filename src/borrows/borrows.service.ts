import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BorrowsEntity } from './borrows.entity';
import { Brackets, Repository } from 'typeorm';
import { BorrowsSoftDto } from './dtos/borrows.dto';
import { BooksService } from '../books/books.service';
import { UsersService } from '../users/users.service';
import { BorrowsStatusEnum } from './constants/borrows-status.const';

@Injectable()
export class BorrowsService {
  constructor(
    @InjectRepository(BorrowsEntity)
    private borrowsRepository: Repository<BorrowsEntity>,
    private booksService: BooksService,
    private usersService: UsersService,
  ) {}

  // Create a new borrow
  private async create(
    bookId: number,
    userId: number,
    dto: BorrowsSoftDto,
  ): Promise<BorrowsEntity> {
    const borrow = await this.borrowsRepository.create(dto);

    borrow.book = await this.booksService.getById(bookId);
    if (!borrow.book) {
      throw new HttpException('Book not found', 404);
    }
    borrow.user = await this.usersService.getById(userId);

    const result = await this.borrowsRepository.save(borrow);

    return await this.borrowsRepository.findOne({
      where: { id: result.id },
      relations: ['book', 'user'],
    });
  }

  // Create a new borrow with a status of requested
  async request(userId: number, bookId: number): Promise<BorrowsEntity> {
    const dto: BorrowsSoftDto = {
      status: BorrowsStatusEnum.REQUESTED,
    };

    const books = await this.getByBook(bookId);
    if (!books) {
      throw new HttpException('Book not found', 404);
    }

    if (books.length > 0 && books[0].status !== BorrowsStatusEnum.RETURNED) {
      throw new HttpException('Book is not available', 400);
    }

    return await this.create(bookId, userId, dto);
  }

  async getAll(): Promise<BorrowsEntity[]> {
    return await this.borrowsRepository.find({ relations: ['book', 'user'] });
  }

  async getById(id: number): Promise<BorrowsEntity> {
    return await this.borrowsRepository.findOne({
      where: { id },
      relations: ['book', 'user'],
    });
  }

  async getByBook(id: number): Promise<BorrowsEntity[]> {
    const result = await this.borrowsRepository
      .createQueryBuilder('borrow')
      .innerJoinAndSelect('borrow.book', 'book')
      .innerJoinAndSelect('borrow.user', 'user')
      .where('borrow.bookId = :id', { id })
      .orderBy('borrow.createdAt', 'DESC')
      .getMany();

    return result;
  }

  async getByUser(
    id: number,
    status: BorrowsStatusEnum | null,
  ): Promise<BorrowsEntity[]> {
    const result = await this.borrowsRepository
      .createQueryBuilder('borrow')
      .innerJoinAndSelect('borrow.book', 'book')
      .innerJoinAndSelect('borrow.user', 'user')
      .where(
        `borrow.userId = :id ${status ? 'AND borrow.status = ' + status : ''}`, // TODO: Refactor this
        {
          id,
        },
      )
      .orderBy('borrow.createdAt', 'DESC')
      .getMany();

    return result;
  }

  async getRequests(): Promise<BorrowsEntity[]> {
    return await this.borrowsRepository.find({
      where: { status: BorrowsStatusEnum.REQUESTED },
      relations: ['book', 'user'],
      order: { createdAt: 'DESC' }, // Get the latest requests first
    });
  }

  async getOverdue(userId: number): Promise<number> {
    const result = await this.borrowsRepository
      .createQueryBuilder('borrow')
      .where('borrow.userId = :userId', { userId }) // Select only the borrows of the user
      .andWhere('borrow.status <> :status', { status: 'rejected' }) // Select only the borrows that are not rejected
      .andWhere('borrow.status <> :status', { status: 'requested' }) // Select only the borrows that are not requested
      .andWhere(
        new Brackets((qb) => {
          qb.where('borrow.expectedAt < :date', { date: new Date() }) // Select only the borrows that are overdue and not returned
            .orWhere('borrow.expectedAt < borrow.returnedAt'); // Select only the borrows that are overdue and returned
        }),
      )
      .getCount();

    return result;
  }

  async confirmBorrow(id: number): Promise<BorrowsEntity> {
    const borrow = await this.getById(id);
    if (borrow.status !== BorrowsStatusEnum.REQUESTED) {
      throw new HttpException('Borrow is not in requested status', 400);
    }
    borrow.status = BorrowsStatusEnum.BORROWED;
    borrow.issuedAt = new Date();
    borrow.expectedAt = new Date();
    borrow.expectedAt.setDate(borrow.issuedAt.getDate() + 10);
    const result = await this.borrowsRepository.save(borrow);

    return await this.borrowsRepository.findOne({
      where: { id: result.id },
      relations: ['book', 'user'],
    });
  }

  async rejectBorrow(id: number): Promise<BorrowsEntity> {
    const borrow = await this.getById(id);
    if (borrow.status !== BorrowsStatusEnum.REQUESTED) {
      throw new HttpException('Borrow is not in requested status', 400);
    }
    borrow.status = BorrowsStatusEnum.REJECTED;
    const result = await this.borrowsRepository.save(borrow);

    return await this.borrowsRepository.findOne({
      where: { id: result.id },
      relations: ['book', 'user'],
    });
  }

  async returnBorrow(id: number): Promise<BorrowsEntity> {
    const borrow = await this.getById(id);
    if (borrow.status !== BorrowsStatusEnum.BORROWED) {
      throw new HttpException('Borrow is not in borrowed status', 400);
    }

    borrow.status = BorrowsStatusEnum.RETURNED;
    borrow.returnedAt = new Date();
    const result = await this.borrowsRepository.save(borrow);

    return await this.borrowsRepository.findOne({
      where: { id: result.id },
      relations: ['book', 'user'],
    });
  }
}
