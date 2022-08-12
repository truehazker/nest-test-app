import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesEntity } from './roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private userRepository: Repository<RolesEntity>,
  ) {}

  async getAll(): Promise<RolesEntity[]> {
    return await this.userRepository.find();
  }

  async create(rolesEntity: RolesEntity): Promise<RolesEntity> {
    return await this.userRepository.save(rolesEntity);
  }

  async getByTitle(title: string): Promise<RolesEntity> {
    return await this.userRepository.findOne({ where: { title } });
  }
}
