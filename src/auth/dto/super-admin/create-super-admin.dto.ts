import { UserStatus, UserRole } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateSuperAdminDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  emirates_id: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  phone: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsEnum(UserStatus)
  status: UserStatus;

  @IsOptional()
  @IsString()
  school_id?: string;
}
