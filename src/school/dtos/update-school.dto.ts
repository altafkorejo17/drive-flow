import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { SchoolStatus, SchoolType } from '@prisma/client';

export class UpdateSchoolDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  trade_license?: string;

  @IsDateString()
  @IsOptional()
  trade_license_expiry?: string;

  @IsEnum(SchoolType)
  @IsOptional()
  school_type?: SchoolType;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsEnum(SchoolStatus)
  @IsOptional()
  status?: SchoolStatus;
}
