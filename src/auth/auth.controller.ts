import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import { SuperAdminLoginDto } from './dto/super-admin/super-admin-login.dto';
import { SuperAdminService } from './services/super-admin.service';
import { AdminService } from './services/admin.service';
import { CreateSuperAdminDto } from './dto/super-admin/create-super-admin.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private superAdminService: SuperAdminService,
    private adminService: AdminService,
    private authService: AuthService,
  ) {}

  @Public()
  @Post('super-admin/login')
  superAdminlogin(@Body() superAdminLoginDto: SuperAdminLoginDto) {
    return this.superAdminService.superAdminLogin(superAdminLoginDto);
  }

  @Public()
  @Post('super-admin')
  createSuperAdmin(@Body() createSuperAdminDto: CreateSuperAdminDto) {
    return this.superAdminService.register(createSuperAdminDto);
  }

  @Get('/super-admin')
  getSuperAdmins() {
    return this.superAdminService.getAllSuperAdmins();
  }
}
