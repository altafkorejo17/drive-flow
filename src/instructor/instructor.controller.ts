import { Body, Controller, Post } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { CreateInstructorDto } from './dtos/create-instructor.dto';

@Controller('instructor')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @Post()
  create(@Body() dto: CreateInstructorDto) {
    return this.instructorService.create(dto);
  }
}
