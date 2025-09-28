import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // 🔧 CONFIGURACIÓN CORS - AGREGA ESTO
  app.enableCors({
    origin: [
      'https://eons.es',
      'https://www.eons.es',
      'http://localhost:4321', // para desarrollo
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'Access-Control-Request-Method',
      'Access-Control-Request-Headers',
    ],
    exposedHeaders: [
      'Authorization',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Credentials',
    ],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // 🔧 MIDDLEWARE PERSONALIZADO PARA HEADERS - AGREGA ESTO TAMBIÉN
  app.use((req, res, next) => {
    const allowedOrigins = [
      'https://eons.es',
      'https://www.eons.es',
      'http://localhost:4321',
    ];
    const origin = req.headers.origin as string;

    if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }

    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS, PATCH',
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Requested-With, Accept, Origin',
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Expose-Headers', 'Authorization');

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    next();
  });

  // Pipe de validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`🚀 Application running on: http://localhost:${port}`);
  logger.log(`🌍 CORS enabled for: https://eons.es, https://www.eons.es`);
}

bootstrap();
