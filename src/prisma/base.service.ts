import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class BaseService {
  constructor(protected readonly prisma: PrismaService) {}
}
