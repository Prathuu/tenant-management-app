import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { GlobalExceptionFilter } from '@/common/exceptions/global-exception.filter';
import { PrismaExceptionFilter } from '@/common/exceptions/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip unknown fields
      forbidNonWhitelisted: true, // error on extra fields
      transform: true, // auto-transform params
    }),
  );

  app.useGlobalFilters(
    new PrismaExceptionFilter(),
    new GlobalExceptionFilter(),
  );

  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
