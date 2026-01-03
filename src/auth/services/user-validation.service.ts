import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserValidationService {
  constructor(private readonly prisma: PrismaService) {}

  async validateNewUser(email?: string, emiratesId?: string) {
    if (!email && !emiratesId) {
      throw new BadRequestException(
        'Either email or Emirates ID must be provided.',
      );
    }

    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: email ?? undefined },
          { emiratesId: emiratesId ?? undefined },
        ],
      },
    });

    if (existingUser) {
      throw new BadRequestException(
        'User with provided email or Emirates ID already exists.',
      );
    }
  }
}
