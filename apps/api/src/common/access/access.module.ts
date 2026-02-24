import { Global, Module } from '@nestjs/common';
import { AccessService } from './access.service';
import { PrismaModule } from '@prisma/prisma.module';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [AccessService],
  exports: [AccessService],
})
export class AccessModule {}
