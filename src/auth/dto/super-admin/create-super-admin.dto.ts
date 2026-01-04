import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { UserRole, UserStatus } from '@prisma/client';

export class CreateSuperAdminDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  emirates_id: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEnum(UserStatus)
  status: UserStatus;

  @IsEnum(UserRole)
  role: UserRole;

  @ValidateIf((dto) => dto.role !== UserRole.SUPER_ADMIN)
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  school_ids?: string[];
}
