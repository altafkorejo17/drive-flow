import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNotEmpty()
  password: string;
}
