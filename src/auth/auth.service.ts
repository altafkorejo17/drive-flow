import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/prisma/base.service';

@Injectable()
export class AuthService extends BaseService {
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
