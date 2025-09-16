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
  
  // Forzar modo desarrollo
  const isDevelopment = true;
  
  app.enableCors({
    origin: [
      'http://localhost:4321', // Desarrollo frontend
      'http://localhost:3000', // Desarrollo backend
      'http://localhost:5173', // Desarrollo alternativo
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization, Accept',
  });
  
  await app.listen(3000);
  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
  console.log(`🌍 Environment: Development (Forced)`);
}
bootstrap();
