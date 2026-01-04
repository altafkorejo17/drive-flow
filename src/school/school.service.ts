import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSchoolDto } from './dtos/create-school.dto';
import { UpdateSchoolDto } from './dtos/update-school.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MESSAGES } from 'src/constants/messages';
import { SchoolStatus } from '@prisma/client';

@Injectable()
export class SchoolService {
  constructor(private readonly prisma: PrismaService) {}

  /** Public Methods **/

  async create(dto: CreateSchoolDto) {
    await this.ensureTradeLicenseUnique(dto.trade_license);

    return this.prisma.school.create({
      data: this.mapCreateDtoToData(dto),
    });
  }

  async update(id: string, dto: Partial<UpdateSchoolDto>) {
    const school = await this.findSchoolById(id);

    if (dto.trade_license && dto.trade_license !== school.tradeLicense) {
      await this.ensureTradeLicenseUnique(dto.trade_license);
    }

    return this.prisma.school.update({
      where: { id },
      data: this.mapUpdateDtoToData(dto),
    });
  }

  async findAll() {
    return this.prisma.school.findMany({
      select: {
        id: true,
        name: true,
        tradeLicense: true,
        address: true,
      },
      orderBy: { id: 'desc' },
    });
  }

  /** Private Helper Methods **/

  private async findSchoolById(id: string) {
    const school = await this.prisma.school.findUnique({ where: { id } });
    if (!school) {
      throw new NotFoundException(MESSAGES.SCHOOL_NOT_FOUND);
    }
    return school;
  }

  private async ensureTradeLicenseUnique(tradeLicense: string) {
    const existing = await this.prisma.school.findFirst({
      where: { tradeLicense },
    });
    if (existing) {
      throw new BadRequestException(MESSAGES.TRADE_LICENSE_EXISTS);
    }
  }

  private mapCreateDtoToData(dto: CreateSchoolDto) {
    return {
      name: dto.name,
      tradeLicense: dto.trade_license,
      tradeLicenseExpiry: new Date(dto.trade_license_expiry),
      schoolType: dto.school_type,
      address: dto.address,
      city: dto.city,
      country: dto.country,
      phone: dto.phone,
      status: dto.status ?? SchoolStatus.ACTIVE,
    };
  }

  private mapUpdateDtoToData(dto: Partial<UpdateSchoolDto>) {
    const data: any = { ...dto };
    if (dto.trade_license_expiry) {
      data.tradeLicenseExpiry = new Date(dto.trade_license_expiry);
      delete data.trade_license_expiry;
    }
    if (dto.trade_license) {
      data.tradeLicense = dto.trade_license;
      delete data.trade_license;
    }
    if (dto.school_type) {
      data.schoolType = dto.school_type;
      delete data.school_type;
    }
    return data;
  }
}
