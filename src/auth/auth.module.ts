import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SuperAdminService } from './services/super-admin.service';
import { AdminService } from './services/admin.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET') || 'default_secret',
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [
    AuthService, 
    SuperAdminService, 
    AdminService, 
    JwtStrategy
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
