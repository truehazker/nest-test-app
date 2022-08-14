import { HttpException, Injectable } from '@nestjs/common';
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
    const existingRole = await this.getByTitle(dto.title);

    if (existingRole) {
      throw new HttpException('Role already exists', 409);
    }

    return await this.rolesRepository.save(dto);
  }

  async getAll(): Promise<RolesEntity[]> {
    return await this.rolesRepository.find();
  }

  async getByTitle(title: RolesEnum): Promise<RolesEntity> {
    return await this.rolesRepository.findOne({ where: { title } });
  }

  async getById(id: number): Promise<RolesEntity> {
    return await this.rolesRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: RolesDto): Promise<RolesEntity> {
    const role = await this.rolesRepository.findOne({ where: { id } });
    if (!role) {
      throw new HttpException('Role not found', 404);
    }

    const modified = await this.rolesRepository.merge(role, dto);
    await this.rolesRepository.save(modified);

    return await this.rolesRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<RolesEntity> {
    const role = await this.rolesRepository.findOne({ where: { id } });
    await this.rolesRepository.delete(id);
    return role;
  }
}
