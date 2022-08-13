import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { RolesService } from '../roles/roles.service';
import { UserDTO } from '../dtos/user.dto';

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

  async create(dto: UserDTO): Promise<UsersEntity> {
    const user = this.userRepository.create(dto);
    const role = await this.roleService.getByTitle('USER');
    user.roles = [role];
    return await this.userRepository.save(user);
  }

  async getByEmail(email: string): Promise<UsersEntity> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async getById(id: number): Promise<UsersEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }
}
