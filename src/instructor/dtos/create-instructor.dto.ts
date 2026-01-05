import { UserStatus, UserRole } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsInt,
  IsUUID,
  ValidateIf,
  IsEnum,
  IsIn,
  IsArray,
  ArrayNotEmpty,
  IsEmail,
} from 'class-validator';

export class CreateInstructorDto {
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

  role: UserRole = UserRole.INSTRUCTOR;

  @ValidateIf((dto) => dto.role !== UserRole.SUPER_ADMIN)
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  school_ids?: string[];

  @IsString()
  @IsNotEmpty()
  license_no: string;

  @IsDateString()
  @IsNotEmpty()
  license_expiry_date: Date;

  @IsInt()
  @IsNotEmpty()
  experience: number;
}
