import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BorrowsEntity } from './borrows.entity';
import { BorrowsService } from './borrows.service';
import { Roles } from '../roles/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../roles/guards/roles.guard';
import { AuthService } from '../auth/auth.service';
import { RolesEnum } from '../roles/constants/roles.const';

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

  @ApiOperation({ summary: 'Request a book' })
  @ApiResponse({
    status: 200,
    description: 'Successful request',
  })
  @ApiResponse({
    status: 404,
    description: 'Book not found',
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.USER)
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

  @ApiOperation({ summary: 'Get my borrows' })
  @ApiResponse({
    status: 200,
    description: 'Successful request',
  })
  @ApiResponse({
    status: 404,
    description: 'Borrows not found',
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('my')
  async getByUser(@Request() req): Promise<BorrowsEntity[]> {
    const decodedJwtAccessToken = await this.authService.decodeJwt(
      req.headers.authorization,
    );
    const userId = decodedJwtAccessToken.sub;

    return await this.borrowService.getByUser(userId, null);
  }

  @ApiOperation({ summary: 'Get all pending requests' })
  @ApiResponse({
    status: 200,
    description: 'Successful request',
  })
  @ApiResponse({
    status: 404,
    description: 'Borrows not found',
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('requests')
  async getRequests(): Promise<BorrowsEntity[]> {
    return await this.borrowService.getRequests();
  }

  @ApiOperation({ summary: 'Confirm borrow' })
  @ApiResponse({
    status: 200,
    description: 'Successful request',
  })
  @ApiResponse({
    status: 404,
    description: 'Borrow not found',
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/confirm')
  async confirm(@Param('id') id: number): Promise<BorrowsEntity> {
    return await this.borrowService.confirmBorrow(id);
  }

  @ApiOperation({ summary: 'Reject borrow' })
  @ApiResponse({
    status: 200,
    description: 'Successfully rejected',
  })
  @ApiResponse({
    status: 404,
    description: 'Borrow not found',
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/reject')
  async reject(@Param('id') id: number): Promise<BorrowsEntity> {
    return await this.borrowService.rejectBorrow(id);
  }

  @ApiOperation({ summary: 'Return book from borrow' })
  @ApiResponse({
    status: 200,
    description: 'Successful request',
  })
  @ApiResponse({
    status: 404,
    description: 'Borrows not found',
  })
  @ApiBearerAuth()
  @Roles('USER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/return/')
  async return(@Param('id') id: number): Promise<BorrowsEntity> {
    return await this.borrowService.returnBorrow(id);
  }
}
