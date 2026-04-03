import { UserRole } from './user.dto.js';

export class UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  pin?: string;
  active?: boolean;
  role?: UserRole;
}
