import { APP_GUARD, Reflector } from '@nestjs/core';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

export const AuthProviders = [
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
  {
    provide: APP_GUARD,
    useFactory: (reflector: Reflector) => new JwtAuthGuard(reflector),
    inject: [Reflector],
  },
];
