import { ValidationPipe } from '@nestjs/common';

export function setupValidation(app: any) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );
}
