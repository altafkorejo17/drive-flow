import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { AuthProviders } from './common/providers/providers';
import { JwtAuthModule } from './jwt/jwt-auth.module';
import { SchoolModule } from './school/school.module';
import { JwtStrategy } from './jwt/jwt.strategy';
import { InstructorModule } from './instructor/instructor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    AdminModule,
    SchoolModule,
    InstructorModule,
  ],
  controllers: [AppController],
  providers: [AppService, ...AuthProviders, JwtStrategy],
})
export class AppModule {}
