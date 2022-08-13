import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from './roles.const';

export const Roles = (...roles: string[]) => {
  return SetMetadata(ROLES_KEY, roles);
};
