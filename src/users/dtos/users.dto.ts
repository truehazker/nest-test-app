import { RolesDto } from '../../roles/dtos/roles.dto';

export class UsersDto {
  name: string;
  surname: string;
  birthdate: Date;
  passport: number;
  email: string;
  password: string;
  roles: RolesDto[];
}
