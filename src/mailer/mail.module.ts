import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'BREVO_HOST',
        port: 587,
        secure: false,
        auth: {
          user: 'BREVO_USER',
          pass: 'BREVO_PASSWORD',
        },
      },
    }),
  ],
  exports: [MailerModule],
})
export class MailModule {}
