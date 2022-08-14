import { RolesEnum } from '../constants/roles.const';
import { ApiProperty } from '@nestjs/swagger';

export class RolesDto {
  @ApiProperty({
    description: 'Role title',
    example: RolesEnum.ADMIN,
  })
  title: RolesEnum;
}
