import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthResource } from 'src/common/resources/auth/auth.resource';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { AdminLoginDto } from './dtos/admin-login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRole } from '@prisma/client';
import { CreateInstructorDto } from 'src/instructor/dtos/create-instructor.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async create(dto: CreateAdminDto) {
    const user = await this.prisma.$transaction(async (tx) => {
      return await this.authService.createUser(tx, dto);
    });

    return new AuthResource(user);
  }

  async login(dto: AdminLoginDto) {
    if (!dto.email) throw new BadRequestException('Email ID is required');

    const user = await this.authService.findOne(dto.email, UserRole.ADMIN);

    const isPasswordValid = await this.authService.isPasswordValid(
      dto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.authService.generateToken(user.id, user.role);

    return {
      user: new AuthResource(user),
      accessToken: token,
    };
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      where: { role: UserRole.ADMIN },
      orderBy: { id: 'desc' },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        emiratesId: true,
        role: true,
        status: true,
        createdAt: true,
        instructor: true,
      },
    });

    return AuthResource.collection(users);
  }
}
