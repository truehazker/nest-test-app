import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from './roles.entity';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [TypeOrmModule.forFeature([RolesEntity])],
  exports: [RolesService], // Export RolesService to use RolesModule inside UsersService
})
export class RolesModule {}
