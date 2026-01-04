import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from 'src/jwt/jwt.strategy';

@Module({
  providers: [SchoolService, PrismaService],
  controllers: [SchoolController],
})
export class SchoolModule {}
