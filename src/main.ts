import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // 🔧 CONFIGURACIÓN CORS MEJORADA
  app.enableCors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            'https://eons.es',
            'https://www.eons.es',
            'http://localhost:4321'
        ];
        
        // Permitir requests sin origin (como mobile apps o curl)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log(`CORS blocked for origin: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Origin',
        'Access-Control-Request-Method',
        'Access-Control-Request-Headers',
        'X-Forwarded-For',
        'X-Real-IP'
    ],
    exposedHeaders: [
        'Authorization',
        'Access-Control-Allow-Origin',
    ],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 86400 // 24 horas
  });

  // 🔧 MIDDLEWARE PERSONALIZADO PARA HEADERS
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
      'GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD',
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Requested-With, Accept, Origin, X-Forwarded-For, X-Real-IP',
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Expose-Headers', 'Authorization');
    res.header('Access-Control-Max-Age', '86400');

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
  logger.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
}

bootstrap();
