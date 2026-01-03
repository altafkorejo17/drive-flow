import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class AdminLoginDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  emirates_id: string;

  @IsNotEmpty()
  password: string;
}
