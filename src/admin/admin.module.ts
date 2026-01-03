import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthModule } from 'src/jwt/jwt-auth.module';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { AuthModule } from 'src/auth/auth.module';
import { AdminService } from './admin.service';

@Module({
  imports: [PrismaModule, PassportModule, JwtAuthModule, AuthModule],
  providers: [JwtStrategy, AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
