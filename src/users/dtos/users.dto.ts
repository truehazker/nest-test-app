import { RolesDto } from '../../roles/dtos/roles.dto';

export interface UsersDto {
  name: string;
  surname: string;
  birthdate: Date;
  passport: number;
  email: string;
  password: string;
  roles: RolesDto[];
}

export interface UserPartialDTO {
  email?: string;
  password?: string;
}
