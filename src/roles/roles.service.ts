import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesEntity } from './roles.entity';
import { RolesDto } from './dtos/roles.dto';
import { RolesEnum } from './constants/roles.const';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private rolesRepository: Repository<RolesEntity>,
  ) {}

  async create(dto: RolesDto): Promise<RolesEntity> {
    return await this.rolesRepository.save(dto);
  }

  async getAll(): Promise<RolesEntity[]> {
    return await this.rolesRepository.find();
  }

  async getByTitle(title: RolesEnum): Promise<RolesEntity> {
    return await this.rolesRepository.findOne({ where: { title } });
  }

  async update(id: number, dto: RolesDto): Promise<RolesEntity> {
    await this.rolesRepository.update(id, dto);
    const role = await this.rolesRepository.findOne({ where: { id } });
    return role;
  }

  async delete(id: number): Promise<RolesEntity> {
    const role = await this.rolesRepository.findOne({ where: { id } });
    await this.rolesRepository.delete(id);
    return role;
  }
}
