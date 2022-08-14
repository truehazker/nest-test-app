import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UsersEntity } from '../users/users.entity';
import { RolesEnum } from './constants/roles.const';

@Entity('roles')
export class RolesEntity {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the role',
    type: Number,
  })
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @ApiProperty({
    example: 'USER',
    description: 'The title of the role',
    enum: RolesEnum,
  })
  @Column({ type: 'varchar', length: '42', unique: true })
  title: RolesEnum;

  @ApiProperty({
    description: 'The users who has the role',
  })
  @ManyToMany(() => UsersEntity)
  users: UsersEntity[];
}
