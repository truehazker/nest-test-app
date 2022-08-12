import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UsersEntity } from '../users/users.entity';

@Entity('roles')
export class RolesEntity {
  @ApiProperty({ example: 1, description: 'The unique identifier for a role' })
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @ApiProperty({ example: 'USER', description: 'The title of a user' })
  @Column({ type: 'varchar', length: '42' })
  title: string;

  @ManyToMany(() => UsersEntity)
  users: UsersEntity[];
}
