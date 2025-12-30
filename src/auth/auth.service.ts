import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (existingUser) {
      throw new BadRequestException(
        'User with given emirates id already exists',
      );
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return this.prisma.user.create({
      data: {
        first_name: dto.first_name,
        last_name: dto.last_name,
        email: dto.email,
        emirates_id: dto.emirates_id,
        password: hashedPassword,
        phone: dto.phone,
        role: dto.role,
        status: dto.status ?? 'ACTIVE',
        school_id: dto.school_id,
      },
    });
  }
}
