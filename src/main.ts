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

  // Configuración para producción
  const isDevelopment = process.env.NODE_ENV === 'development';

  app.enableCors({
    origin: [
      'http://localhost:4321', // Desarrollo frontend
      'http://localhost:3000', // Desarrollo backend
      'http://localhost:5173', // Desarrollo alternativo
      'https://eons.es', // ✅ Dominio de producción
      'https://www.eons.es', // ✅ Versión con www
      'https://api.eons.es',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization, Accept',
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'production'}`);
}
bootstrap();