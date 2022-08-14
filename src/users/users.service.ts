import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { RolesService } from '../roles/roles.service';
import { UsersUpdateDto } from './dtos/users-update.dto';
import { UsersRegisterDto } from './dtos/users-register.dto';
import { RolesEnum } from '../roles/constants/roles.const';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    private roleService: RolesService,
  ) {}

  async create(dto: UsersRegisterDto): Promise<UsersEntity> {
    const twin = await this.getByEmail(dto.email);
    if (twin)
      throw new HttpException('User with this email already exists', 409);

    const user = this.userRepository.create(dto);
    const role = await this.roleService.getByTitle(RolesEnum.USER);
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

  async assignRole(id: number, title: RolesEnum): Promise<UsersEntity> {
    const user = await this.getById(id);

    if (!user) throw new HttpException('User not found', 404);

    const role = await this.roleService.getByTitle(title);

    if (role && user.roles.findIndex((e) => e.title === title) === -1)
      user.roles.push(role);

    return await this.userRepository.save(user);
  }

  async removeRole(id: number, title: string): Promise<UsersEntity> {
    const user = await this.getById(id);

    if (!user) throw new HttpException('User not found', 404);

    user.roles = user.roles.filter((e) => e.title !== title);
    return await this.userRepository.save(user);
  }

  async update(id: number, dto: UsersUpdateDto): Promise<UsersEntity> {
    const user = await this.getById(id);

    if (!(await this.getById(id)))
      throw new HttpException('User not found', 404);

    const modified = await this.userRepository.merge(user, dto);
    await this.userRepository.save(modified);

    return await this.userRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    const user = await this.getById(id);
    if (!user) throw new HttpException('User not found', 404);
    await this.userRepository.delete(id);
  }
}
