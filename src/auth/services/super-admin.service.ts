import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSuperAdminDto } from '../dto/super-admin/create-super-admin.dto';
import { JwtTokenService } from './jwt-token.service';
import { PasswordService } from './password.service';
import { UserValidationService } from './user-validation.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SuperAdminLoginDto } from '../dto/super-admin/super-admin-login.dto';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class SuperAdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly validationService: UserValidationService,
    private readonly passwordService: PasswordService,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  async create<T extends CreateUserDto>(dto: T) {
    await this.validationService.validateNewUser(dto.email, dto.emirates_id);
    const hashedPassword = await this.passwordService.hashPassword(
      dto.password,
    );

    const user = await this.prisma.user.create({
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

    return {
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      emirates_id: user.emiratesId,
      role: user.role,
      status: user.status,
      created_at: user.createdAt,
    };
  }

  async login(dto: SuperAdminLoginDto) {
    if (!dto.email) throw new BadRequestException('Email ID is required');

    const user = await this.prisma.user.findFirst({
      where: { AND: [{ role: 'SUPER_ADMIN' }, { email: dto.email }] },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await this.passwordService.comparePassword(
      dto.password,
      user.password,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtTokenService.generateToken(user.id, user.role);

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

  async list() {
    const users = await this.prisma.user.findMany({
      where: { role: 'SUPER_ADMIN' },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        emiratesId: true,
        phone: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return users.map((user) => ({
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      emirates_id: user.emiratesId,
      phone: user.phone,
      role: user.role,
      status: user.status,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    }));
  }

  async createAdmin(dto: any) {}
}
