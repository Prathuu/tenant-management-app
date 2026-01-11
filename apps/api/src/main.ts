import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ ENABLE CORS (this is what was missing)
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // ✅ GLOBAL VALIDATION (you already had this right)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // strip unknown fields
      forbidNonWhitelisted: true, // error on extra fields
      transform: true,            // auto-transform params
    }),
  );

  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
