import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BaseService } from 'src/prisma/base.service';
import { CreateSuperAdminDto } from './dto/super-admin/create-super-admin.dto';
import { UserValidationService } from './services/user-validation.service';
import { PasswordService } from './services/password.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtTokenService } from './services/jwt-token.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly validationService: UserValidationService,
    private readonly passwordService: PasswordService,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(dto: any) {
    await this.validationService.validateNewUser(dto.email, dto.emirates_id);

    const hashedPassword = await this.passwordService.hashPassword(
      dto.password,
    );

    return this.prisma.user.create({
      data: {
        firstName: dto.first_name,
        lastName: dto.last_name,
        email: dto.email,
        emiratesId: dto.emirates_id,
        password: hashedPassword,
        phone: dto.phone,
        role: dto.role,
        ...(dto.school_ids?.length && {
          schools: {
            create: dto.school_ids.map((schoolId) => ({
              schoolId,
            })),
          },
        }),
      },
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
      },
    });
  }

  async findOne(email: string, role: UserRole) {
    const user = await this.prisma.user.findFirst({
      where: { AND: [{ role: role }, { email: email }] },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async isPasswordValid(userPassword: string, currentPassword: string) {
    return await this.passwordService.comparePassword(
      userPassword,
      currentPassword,
    );
  }

  async generateToken(user_id: string, role: UserRole) {
    return this.jwtTokenService.generateToken(user_id, role);
  }
}
