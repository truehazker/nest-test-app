import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesEntity } from './roles.entity';
import { RoleDTO } from '../dtos/role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private userRepository: Repository<RolesEntity>,
  ) {}

  async getAll(): Promise<RolesEntity[]> {
    return await this.userRepository.find();
  }

  async create(dto: RoleDTO): Promise<RolesEntity> {
    return await this.userRepository.save(dto);
  }

  async getByTitle(title: string): Promise<RolesEntity> {
    return await this.userRepository.findOne({ where: { title } });
  }
}
