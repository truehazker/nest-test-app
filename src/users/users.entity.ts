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
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the user',
  })
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @ApiProperty({ example: 'John', description: 'The name of the user' })
  @Column({ type: 'varchar', length: '50' })
  name: string;

  @ApiProperty({ example: 'Doe', description: 'The surname of the user' })
  @Column({ type: 'varchar', length: '50' })
  surname: string;

  @ApiProperty({
    example: '02.02.2000',
    description: 'The birthdate of the user',
  })
  @Column({ type: 'date' })
  birthdate: Date;

  @ApiProperty({
    example: '1234567890',
    description: 'The passport of the user',
  })
  @Column({ type: 'integer' })
  passport: number;

  @ApiProperty({ type: RolesEntity, description: 'The roles of the user' })
  @ManyToMany(() => RolesEntity)
  @JoinTable()
  roles: RolesEntity[];

  @ApiProperty({
    example: 'test@domain.com',
    description: 'The email of the user',
  })
  @Column({ type: 'varchar', length: '62', unique: true })
  email: string;

  @ApiProperty({ example: 'password', description: 'The password of the user' })
  @Column({ type: 'varchar', length: '256' })
  password: string;
}
