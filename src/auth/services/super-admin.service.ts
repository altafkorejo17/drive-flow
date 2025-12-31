import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateSuperAdminDto } from '../dto/super-admin/create-super-admin.dto';
import { SuperAdminLoginDto } from '../dto/super-admin/super-admin-login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SuperAdminService {
  private readonly BCRYPT_SALT_ROUNDS = 10;

  constructor(
    private jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async register(dto: CreateSuperAdminDto) {
    await this.validateUser(dto);
    const hashedPassword = await this.hashPassword(dto.password);
    return this.createUser(dto, hashedPassword);
  }

  private async validateUser(dto: CreateSuperAdminDto) {
    if (!dto.email && !dto?.emirates_id) {
      throw new BadRequestException(
        'Either email or Emirates ID must be provided.',
      );
    }

    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: dto.email ?? undefined },
          { emiratesId: dto.emirates_id ?? undefined },
        ],
      },
    });

    if (existingUser) {
      throw new BadRequestException(
        'User with provided email or Emirates ID already exists.',
      );
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.BCRYPT_SALT_ROUNDS);
  }

  private async createUser(dto: CreateSuperAdminDto, hashedPassword: string) {
    return this.prisma.user.create({
      data: {
        firstName: dto.first_name,
        lastName: dto.last_name,
        email: dto.email,
        emiratesId: dto.emirates_id,
        password: hashedPassword,
        phone: dto.phone,
        role: dto.role,
        status: dto.status ?? 'ACTIVE',
        schoolId: dto.school_id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        emiratesId: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });
  }

  async superAdminLogin(dto: SuperAdminLoginDto) {
    if (!dto.email) {
      throw new BadRequestException('Email ID is required');
    }

    const user = await this.prisma.user.findFirst({
      where: {
        AND: [{ role: 'SUPER_ADMIN' }, { email: dto.email }],
      },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    //compare password
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const payload = { sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);
    return {
      user: {
        id: user.id,
        first_name: user.firstName,
        last_name: user.lastName,
        emirates_id: user.emiratesId,
        email: user.email,
        role: user.role,
      },
      accessToken: token,
    };
  }

  async getAllSuperAdmins() {
    return this.prisma.user.findMany({
      where: { role: 'SUPER_ADMIN' },
      orderBy: { createdAt: 'desc' },
    });
  }
}
