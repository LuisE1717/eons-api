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

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsuarioModule,
    JwtModule.register({
      global: true,
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
