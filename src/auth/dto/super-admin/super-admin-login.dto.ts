import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class SuperAdminLoginDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsNotEmpty()
  password: string;
}
