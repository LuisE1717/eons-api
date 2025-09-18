// auth.module.ts - Asegurar configuración correcta
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mailer/mail.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { ConfigModule } from '@nestjs/config';
import { jwtConstants } from './constants/jwt.constant';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsuarioModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.accessSecret,
      signOptions: {
        expiresIn: '6h',
        issuer: 'eons-api',
        audience: 'eons-users',
      },
    }),
    MailModule,
    PrismaModule,
    HttpModule,
    NotificationsModule,
    ConfigModule,
  ],
  exports: [AuthService],
})
export class AuthModule {}
