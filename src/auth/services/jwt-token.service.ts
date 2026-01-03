import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(userId: string, role: string) {
    const payload = { sub: userId, role };
    return this.jwtService.sign(payload);
  }
}
