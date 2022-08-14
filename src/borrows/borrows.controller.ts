import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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

  @Roles('USER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('my')
  async getByUser(@Request() req): Promise<BorrowsEntity[]> {
    const decodedJwtAccessToken = await this.authService.decodeJwt(
      req.headers.authorization,
    );
    const userId = decodedJwtAccessToken.sub;

    return await this.borrowService.getByUser(userId, null);
  }

  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('requests')
  async getRequests(): Promise<BorrowsEntity[]> {
    return await this.borrowService.getRequests();
  }

  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('confirm/:id')
  async confirm(@Param('id') id: number): Promise<BorrowsEntity> {
    return await this.borrowService.confirmBorrow(id);
  }

  @Roles('USER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('return/:id')
  async return(@Param('id') id: number): Promise<BorrowsEntity> {
    return await this.borrowService.returnBorrow(id);
  }
}
