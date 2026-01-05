import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BaseService } from 'src/prisma/base.service';
import { CreateSuperAdminDto } from './dto/super-admin/create-super-admin.dto';
import { UserValidationService } from './services/user-validation.service';
import { PasswordService } from './services/password.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtTokenService } from './services/jwt-token.service';
import { UserRole } from '@prisma/client';
import { CreateInstructorDto } from 'src/instructor/dtos/create-instructor.dto';
import { CreateUserDto } from './dto/create-user.dto';

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

  async createUser(tx, dto: any) {
    await this.validationService.validateNewUser(dto.email, dto.emirates_id);

    const hashedPassword = await this.passwordService.hashPassword(
      dto.password,
    );

    let validSchoolIds: string[] = [];
    if (dto.school_ids?.length) {
      const schools = await tx.school.findMany({
        where: { id: { in: dto.school_ids } },
        select: { id: true },
      });

      validSchoolIds = schools.map((s) => s.id);

      // Check for invalid IDs
      const invalidIds = dto.school_ids.filter(
        (id) => !validSchoolIds.includes(id),
      );
      if (invalidIds.length) {
        throw new Error(`Invalid school IDs: ${invalidIds.join(', ')}`);
      }
    }

    return tx.user.create({
      data: {
        firstName: dto.first_name,
        lastName: dto.last_name,
        email: dto.email,
        emiratesId: dto.emirates_id,
        password: hashedPassword,
        phone: dto.phone,
        role: dto.role,
        ...(validSchoolIds?.length && {
          schools: {
            create: validSchoolIds.map((schoolId) => ({
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

  async createInstructor(tx, user: { id: string }, dto: CreateInstructorDto) {
    return tx.instructor.create({
      data: {
        user: {
          connect: { id: user.id },
        },
        licenseNo: dto.license_no,
        licenseExpiryDate: dto.license_expiry_date,
        experience: dto.experience,
      },
    });
  }
}
