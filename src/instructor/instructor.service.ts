import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInstructorDto } from './dtos/create-instructor.dto';
import { MESSAGES } from 'src/constants/messages';

@Injectable()
export class InstructorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateInstructorDto) {
    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id: dto.user_id },
    });

    if (!user) {
      throw new BadRequestException(MESSAGES.USER_NOT_FOUND);
    }

    // Check if instructor already exists for this user
    const existingInstructor = await this.prisma.instructor.findUnique({
      where: {
        userId: dto.user_id,
      },
    });

    if (existingInstructor) {
      throw new BadRequestException(MESSAGES.INSTRUCTOR_ALREADY_EXISTS);
    }

    // Create instructor
    const instructor = await this.prisma.instructor.create({
      data: {
        userId: dto.user_id,
        licenseNo: dto.license_no,
        licenseExpiryDate: dto.license_expiry_date,
        experience: dto.experience,
      },
    });

    return instructor;
  }
}
