import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { RolesService } from '../roles/roles.service';
import { UsersDto } from './dtos/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    private roleService: RolesService,
  ) {}

  async create(dto: UsersDto): Promise<UsersEntity> {
    const user = this.userRepository.create(dto);
    const role = await this.roleService.getByTitle('USER');
    user.roles = [role];
    return await this.userRepository.save(user);
  }

  async getAll(): Promise<UsersEntity[]> {
    return await this.userRepository.find({ relations: ['roles'] });
  }

  async getByEmail(email: string): Promise<UsersEntity> {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['roles'],
    });
  }

  async getById(id: number): Promise<UsersEntity> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
  }

  async assignRole(id: number, title: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    const role = await this.roleService.getByTitle(title);
    user.roles = [role];
    return await this.userRepository.save(user);
  }

  async update(id: number, dto: UsersDto): Promise<UsersEntity> {
    await this.userRepository.update(id, dto);
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async delete(id: number): Promise<UsersEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    await this.userRepository.delete(id);
    return user;
  }
}
