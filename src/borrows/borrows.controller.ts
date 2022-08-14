import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BorrowsEntity } from './borrows.entity';
import { BorrowsService } from './borrows.service';
import { Roles } from '../roles/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../roles/guards/roles.guard';
import { AuthService } from '../auth/auth.service';

@ApiTags('borrows')
@Controller('borrows')
export class BorrowsController {
  constructor(
    private borrowService: BorrowsService,
    private authService: AuthService,
  ) {}

  @Get('overdue/:userid')
  async getOverdue(@Param('userid') userId: number): Promise<number> {
    return await this.borrowService.getOverdue(userId);
  }

  @ApiOperation({
    summary: 'Request a borrow',
  })
  @ApiResponse({
    status: 200,
    description: 'The created borrow',
    type: BorrowsEntity,
  })
  @Roles('USER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('request/:bookId')
  async request(
    @Request() req,
    @Param('bookId') bookId: number,
  ): Promise<BorrowsEntity> {
    const decodedJwtAccessToken = await this.authService.decodeJwt(
      req.headers.authorization,
    );
    const userId = decodedJwtAccessToken.sub;

    return await this.borrowService.request(userId, bookId);
  }

  @ApiOperation({
    summary: 'Get all borrows for a user',
  })
  @ApiResponse({
    status: 200,
    description: 'The updated borrow',
    type: [BorrowsEntity],
  })
  @Roles('USER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('user')
  async getByUser(@Request() req): Promise<BorrowsEntity[]> {
    const decodedJwtAccessToken = await this.authService.decodeJwt(
      req.headers.authorization,
    );
    const userId = decodedJwtAccessToken.sub;

    return await this.borrowService.getByUser(userId, null);
  }

  @ApiOperation({
    summary: 'Get all requested borrows',
  })
  @ApiResponse({
    status: 200,
    description: 'The found borrows',
    type: [BorrowsEntity],
  })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('requests')
  async getRequests(): Promise<BorrowsEntity[]> {
    return await this.borrowService.getRequests();
  }

  @ApiOperation({
    summary: 'Confirm a borrow',
  })
  @ApiResponse({
    status: 200,
    description: 'The confirmed borrow',
    type: BorrowsEntity,
  })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('confirm/:id')
  async confirm(@Param('id') id: number): Promise<BorrowsEntity> {
    return await this.borrowService.confirmBorrow(id);
  }
}
