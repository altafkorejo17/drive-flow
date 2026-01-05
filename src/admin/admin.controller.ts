import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { AdminLoginDto } from './dtos/admin-login.dto';
import { AdminService } from './admin.service';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateInstructorDto } from 'src/instructor/dtos/create-instructor.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async create(@Body() dto: CreateAdminDto) {
    const user = this.adminService.create(dto);
    return user;
  }

  @Public()
  @Post('/login')
  login(@Body() dto: AdminLoginDto) {
    return this.adminService.login(dto);
  }

  @Get()
  list() {
    return this.adminService.findAll();
  }
}
