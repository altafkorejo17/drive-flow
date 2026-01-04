import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsInt,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateInstructorDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

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
