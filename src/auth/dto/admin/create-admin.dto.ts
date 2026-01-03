import { UserStatus, UserRole } from '@prisma/client';
import { IsIn } from 'class-validator';
import { CreateUserDto } from '../create-user.dto';

export class createAdminDto extends CreateUserDto {
  @IsIn([UserRole.ADMIN, UserRole.INSTRUCTOR, UserRole.STUDENT])
  role: UserRole = UserRole.ADMIN;
}
