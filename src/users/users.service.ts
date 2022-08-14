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
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
    const role = await this.roleService.getByTitle(title);

    if (role && user.roles.findIndex((e) => e.title === title) === -1)
      user.roles.push(role);

    return await this.userRepository.save(user);
  }

  async removeRole(id: number, title: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
    user.roles = user.roles.filter((e) => e.title !== title);
    return await this.userRepository.save(user);
  }

  async update(id: number, dto: UsersDto): Promise<UsersEntity> {
    await this.userRepository.update(id, dto);
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
