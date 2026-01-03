import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SuperAdminService } from './services/super-admin.service';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthModule } from 'src/jwt/jwt-auth.module';
import { JwtTokenService } from './services/jwt-token.service';
import { UserValidationService } from './services/user-validation.service';
import { PasswordService } from './services/password.service';

@Module({
  imports: [PrismaModule, PassportModule, JwtAuthModule],
  providers: [
    AuthService,
    SuperAdminService,
    JwtTokenService,
    UserValidationService,
    PasswordService,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
