import { UserRole, UserStatus } from '@prisma/client';

export class CreateUserDto {
  first_name: string;
  last_name: string;
  email: string;
  emirates_id: string;
  password: string;
  phone: string;
  status: UserStatus;
  role: UserRole;
  school_id?: string;
}
