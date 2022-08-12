import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    private roleService: RolesService,
  ) {}

  async getAll(): Promise<UsersEntity[]> {
    return await this.userRepository.find({ relations: ['roles'] });
  }

  async create(usersEntity: UsersEntity): Promise<UsersEntity> {
    const _ = await this.roleService.getByTitle('USER');
    usersEntity.roles = [_];
    return await this.userRepository.save(usersEntity);
  }
}
