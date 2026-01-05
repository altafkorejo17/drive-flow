import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSuperAdminDto } from '../dto/super-admin/create-super-admin.dto';
import { JwtTokenService } from './jwt-token.service';
import { PasswordService } from './password.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SuperAdminLoginDto } from '../dto/super-admin/super-admin-login.dto';
import { AuthService } from '../auth.service';
import { AuthResource } from 'src/common/resources/auth/auth.resource';
import { UserRole } from '@prisma/client';
import { Public } from 'src/common/decorators/public.decorator';

@Injectable()
export class SuperAdminService {
  constructor(
    private prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async create(dto: CreateSuperAdminDto) {
    const user = await this.prisma.$transaction(async (tx) => {
      return this.authService.createUser(tx, dto);
    });

    return new AuthResource(user);
  }

  @Public()
  async login(dto: SuperAdminLoginDto) {
    if (!dto.email) throw new BadRequestException('Email ID is required');

    const user = await this.authService.findOne(
      dto.email,
      UserRole.SUPER_ADMIN,
    );

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

  async getAll() {
    const users = await this.prisma.user.findMany({
      where: { role: 'SUPER_ADMIN' },
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
      },
    });

    return AuthResource.collection(users);
  }
}
