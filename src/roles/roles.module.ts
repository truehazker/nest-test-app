import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from './roles.entity';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [TypeOrmModule.forFeature([RolesEntity])], // Import RolesEntity to use it inside RolesService
  exports: [RolesService], // Export RolesService to use RolesModule inside UsersService
})
export class RolesModule {}
