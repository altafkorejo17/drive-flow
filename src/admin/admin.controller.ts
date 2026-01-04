import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { AdminLoginDto } from './dtos/admin-login.dto';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async create(@Body() dto: CreateAdminDto) {
    return this.adminService.create(dto);
  }

  @Post('/login')
  login(@Body() dto: AdminLoginDto) {
    return this.adminService.login(dto);
  }

  @Get()
  list() {
    return this.adminService.list();
  }
}
