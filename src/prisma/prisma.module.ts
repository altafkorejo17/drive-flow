import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { BaseService } from './base.service';

@Module({
  providers: [PrismaService, BaseService],
  exports: [BaseService],
})
export class PrismaModule {}
