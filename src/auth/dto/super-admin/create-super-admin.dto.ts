import { CreateUserDto } from '../create-user.dto';
import { UserRole } from '@prisma/client';

export class CreateSuperAdminDto extends CreateUserDto {
  role: UserRole = UserRole.SUPER_ADMIN;
}
