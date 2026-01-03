import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { SuperAdminLoginDto } from './dto/super-admin/super-admin-login.dto';
import { SuperAdminService } from './services/super-admin.service';
import { CreateSuperAdminDto } from './dto/super-admin/create-super-admin.dto';

@Controller('auth/super-admin')
export class AuthController {
  constructor(private superAdminService: SuperAdminService) {}

  @Public()
  @Post('login')
  login(@Body() superAdminLoginDto: SuperAdminLoginDto) {
    return this.superAdminService.login(superAdminLoginDto);
  }

  @Public()
  @Post()
  create(@Body() createSuperAdminDto: CreateSuperAdminDto) {
    return this.superAdminService.create(createSuperAdminDto);
  }

  @Get()
  list() {
    return this.superAdminService.list();
  }
}
