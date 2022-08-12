import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { RolesModule } from '../roles/roles.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([UsersEntity]), RolesModule], // Import RolesModule to use it inside UsersService
  exports: [UsersService], // Export UsersService to use UsersModule inside AuthService
})
export class UsersModule {}
