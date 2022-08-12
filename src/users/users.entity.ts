import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { RolesEntity } from '../roles/roles.entity';

@Entity('users')
export class UsersEntity {
  @ApiProperty({ example: 1, description: 'The unique identifier for a user' })
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @ApiProperty({ example: 'John', description: 'The user name' })
  @Column({ type: 'varchar', length: '50' })
  name: string;

  @ApiProperty({ example: 'Doe', description: 'The user surname' })
  @Column({ type: 'varchar', length: '50' })
  surname: string;

  @ApiProperty({ example: 'birthdate', description: 'The user birthdate' })
  @Column({ type: 'date' })
  birthdate: Date;

  @ApiProperty({ example: '1234567890', description: 'The user passport' })
  @Column({ type: 'integer' })
  passport: number;

  @ApiProperty({ type: RolesEntity, description: 'The user roles' })
  @ManyToMany(() => RolesEntity)
  @JoinTable()
  roles: RolesEntity[];

  @ApiProperty({
    example: 'email@domain.com',
    description: 'The user email address',
  })
  @Column({ type: 'varchar', length: '62', unique: true })
  email: string;

  @ApiProperty({ example: 'password', description: 'The user password' })
  @Column({ type: 'varchar', length: '256' })
  password: string;
}
