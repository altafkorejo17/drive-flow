import {
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole, UserStatus } from '@prisma/client';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  emirates_id: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;

  @IsEnum(UserStatus)
  status: UserStatus;

  @IsIn([
    UserRole.ADMIN,
    UserRole.INSTRUCTOR,
    UserRole.MANAGER,
    UserRole.STUDENT,
  ])
  role: UserRole;

  school_id?: string;
}
