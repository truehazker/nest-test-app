import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class UsersEntity {
  @ApiProperty({ example: 1, description: 'The unique identifier for a user' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'John', description: 'The user name' })
  @Column()
  name: string;

  @ApiProperty({ example: 'Doe', description: 'The user surname' })
  @Column()
  surname: string;

  @ApiProperty({ example: 'birthdate', description: 'The user birthdate' })
  @Column({ type: 'date' })
  birthdate: Date;

  @ApiProperty({ example: '1234567890', description: 'The user passport' })
  @Column({ unique: true })
  passport: number;

  @ApiProperty({ example: 'USER', description: 'The user role' })
  @Column()
  role: string;

  @ApiProperty({
    example: 'email@domain.com',
    description: 'The user email address',
  })
  @Column()
  email: string;

  @ApiProperty({ example: 'password', description: 'The user password' })
  @Column()
  password: string;
}
