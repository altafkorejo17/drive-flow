import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthProviders } from './common/providers/providers';



@Module({
  imports: [
     ConfigModule.forRoot({ isGlobal: true}),
    PrismaModule, 
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, ...AuthProviders],
})
export class AppModule {}
