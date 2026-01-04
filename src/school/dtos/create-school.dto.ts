import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { SchoolType, SchoolStatus } from '@prisma/client';

export class CreateSchoolDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  trade_license: string;

  @IsDateString()
  @IsString()
  trade_license_expiry: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  phone: string;

  @IsEnum(SchoolType)
  school_type: SchoolType;

  @IsEnum(SchoolType)
  @IsOptional()
  status?: SchoolStatus;
}
