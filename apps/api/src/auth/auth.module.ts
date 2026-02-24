import { Module, Global } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@prisma/prisma.module';

@Global()
@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: 'SUPER_SECRET_KEY',
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [JwtModule], // <-- IMPORTANT
})
export class AuthModule {}
