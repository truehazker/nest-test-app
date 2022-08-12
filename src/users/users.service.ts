import { Injectable } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}
  async getAll(): Promise<UsersEntity[]> {
    return await this.userRepository.find();
  }

  async create(usersEntity: UsersEntity): Promise<UsersEntity> {
    return await this.userRepository.save(usersEntity);
  }
}
