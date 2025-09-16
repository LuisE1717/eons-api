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
      'http://localhost:4321', // Desarrollo frontend
      'http://localhost:3000', // Desarrollo backend
      'http://localhost:5173', // Desarrollo alternativo
      // 'https://eons.es', // Producción - COMENTADO
      // 'https://www.eons.es', // Producción - COMENTADO
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization, Accept',
  });
  await app.listen(3000);
}
bootstrap();
