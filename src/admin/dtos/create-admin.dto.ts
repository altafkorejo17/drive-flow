import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsString,
  IsUUID,
  MinLength,
  ValidateIf,
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

  @ValidateIf((dto) => dto.role !== UserRole.SUPER_ADMIN)
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  school_ids?: string[];
}
