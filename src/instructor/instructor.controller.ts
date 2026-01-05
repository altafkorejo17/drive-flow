import { Body, Controller, Get, Post } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { CreateInstructorDto } from './dtos/create-instructor.dto';
import { LoginInstuctorDto } from './dtos/login-instructor.dto';

@Controller('instructor')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @Post()
  login(@Body() dto: LoginInstuctorDto) {
    return this.instructorService.login(dto);
  }

  @Post()
  create(@Body() dto: CreateInstructorDto) {
    return this.instructorService.create(dto);
  }

  @Get()
  findAll() {
    return this.instructorService.findAll();
  }
}
