import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'eonss7070@gmail.com',
          pass: 'qdgf jwld yoqc kzdk',
        },
        tls: {
          rejectUnauthorized: false, // Para evitar problemas de certificado
        },
        connectionTimeout: 10000, // 10 segundos de timeout
        greetingTimeout: 10000, // 10 segundos de timeout
        socketTimeout: 10000, // 10 segundos de timeout
      },
      defaults: {
        from: '"EONS" <eonss7070@gmail.com>',
      },
    }),
  ],
  exports: [MailerModule],
})
export class MailModule {}