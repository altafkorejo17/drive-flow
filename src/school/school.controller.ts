import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateSchoolDto } from './dtos/create-school.dto';
import { SchoolService } from './school.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateSchoolDto } from './dtos/update-school.dto';

@Controller('school')
export class SchoolController {
  constructor(private schoolService: SchoolService) {}

  @Post()
  create(@Body() dto: CreateSchoolDto) {
    return this.schoolService.create(dto);
  }

  @Put('/:id/update')
  update(@Param('id') id: string, @Body() dto: UpdateSchoolDto) {
    return this.schoolService.update(id, dto);
  }

  @Get()
  findAll() {
    return this.schoolService.findAll();
  }
}
