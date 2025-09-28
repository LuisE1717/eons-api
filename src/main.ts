import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // 🔧 CONFIGURACIÓN CORS ROBUSTA - MEJORADA
  app.enableCors({
    origin: [
      'https://eons.es',
      'https://www.eons.es',
      'http://localhost:4321',
      'http://192.168.1.*:*', // Para redes locales
      'http://10.*.*.*:*', // Para redes privadas
      /\.eons\.es$/, // Cualquier subdominio de eons.es
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'Access-Control-Request-Method',
      'Access-Control-Request-Headers',
      'X-Timezone',
      'X-Device-Id',
      'User-Agent',
    ],
    exposedHeaders: [
      'Authorization',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Credentials',
      'X-Request-Id',
    ],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 86400, // 24 horas
  });

  // 🔧 MIDDLEWARE PERSONALIZADO MEJORADO
  app.use((req, res, next) => {
    const allowedOrigins = [
      'https://eons.es',
      'https://www.eons.es',
      'http://localhost:4321',
    ];
    const origin = req.headers.origin as string;

    // Log de requests para debugging
    logger.debug(`🌐 Request: ${req.method} ${req.url} - Origin: ${origin}`);

    if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    } else if (origin && origin.match(/\.eons\.es$/)) {
      res.header('Access-Control-Allow-Origin', origin);
    }

    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD',
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Requested-With, Accept, Origin, X-Timezone, X-Device-Id, User-Agent',
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Expose-Headers', 'Authorization, X-Request-Id');
    res.header('X-Request-Id', req.id || Date.now().toString());

    // Manejar preflight requests
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    next();
  });

  // Pipe de validación global con configuración mejorada
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      disableErrorMessages: false, // Habilitar mensajes de error detallados
    }),
  );

  // Configurar timeout global
  app.use((req, res, next) => {
    req.setTimeout(30000, () => {
      logger.warn(`⏰ Request timeout: ${req.method} ${req.url}`);
    });
    res.setTimeout(30000);
    next();
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`🚀 Application running on: http://localhost:${port}`);
  logger.log(`🌍 CORS enabled for production and development`);
  logger.log(`🔧 Environment: ${process.env.NODE_ENV}`);
}

bootstrap();
