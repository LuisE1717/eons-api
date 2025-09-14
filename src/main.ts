import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { initThrows } from './lanzamientos/lanzamiento';

async function bootstrap() {
  initThrows();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
    origin: [
      'http://localhost:4321',
      'https://eons.es',
      'https://www.eons.es',
      'http://localhost:3000',
      'http://localhost:5173',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization, Accept',
  });
  await app.listen(3000);
}
bootstrap();
