import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInstructorDto } from './dtos/create-instructor.dto';
import { MESSAGES } from 'src/constants/messages';
import { AuthService } from 'src/auth/auth.service';
import { AuthResource } from 'src/common/resources/auth/auth.resource';
import { LoginInstuctorDto } from './dtos/login-instructor.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class InstructorService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async login(dto: LoginInstuctorDto) {
    if (!dto.email) throw new BadRequestException('Email ID is required');

    const user = await this.authService.findOne(dto.email, UserRole.INSTRUCTOR);

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

  async create(dto: CreateInstructorDto) {
    const user = await this.prisma.$transaction(async (tx) => {
      const createdUser = await this.authService.createUser(tx, dto);

      await this.authService.createInstructor(tx, createdUser, dto);

      return createdUser;
    });

    return new AuthResource(user);
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      where: {
        role: { in: ['INSTRUCTOR'] },
      },
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
