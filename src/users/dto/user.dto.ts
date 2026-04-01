export class UserDto {
  id: string;
  name: string;
  email: string;
  role: string = typeof UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  REQUESTER = 'REQUESTER',
  APPROVER = 'APPROVER',
  CHECKER = 'CHECKER',
}
