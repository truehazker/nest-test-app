import { RoleDTO } from './role.dto';

export interface UserDTO {
  name: string;
  surname: string;
  birthdate: Date;
  passport: number;
  email: string;
  password: string;
  roles: RoleDTO[];
}

export interface UserSoftDTO {
  name?: string;
  surname?: string;
  birthdate?: Date;
  passport?: number;
  email?: string;
  password?: string;
  roles?: RoleDTO[];
}
