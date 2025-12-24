import { PrismaService } from './prisma.service';

export class BaseService {
  constructor(private prisma: PrismaService) {}
}
