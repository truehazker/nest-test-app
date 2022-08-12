import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersEntity } from './users.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({
    summary: 'Get all users',
  })
  @ApiResponse({
    status: 200,
    description: 'The found users',
    type: [UsersEntity],
  })
  @Get()
  async findAll(): Promise<UsersEntity[]> {
    return await this.userService.getAll();
  }

  @ApiOperation({
    summary: 'Create a user',
  })
  @ApiResponse({
    status: 201,
    description: 'The created user',
    type: UsersEntity,
  })
  @Post()
  async create(@Body() usersEntity: UsersEntity): Promise<UsersEntity> {
    return await this.userService.create(usersEntity);
  }
}
