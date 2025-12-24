import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({});
  }

  async onModuleInit() {
    await this.$connect(); //connect to db when module initialize
  }

  async onModuleDestroy() {
    await this.$disconnect(); //Disconnects on app shutdown
  }
}
