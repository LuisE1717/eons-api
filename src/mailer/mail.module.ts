import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp-relay.brevo.com',
        port: 587,
        secure: false,
        auth: {
          user: '844fac001@smtp-brevo.com',
          pass: 'xsmtpsib-86a8c23f9a52b0cf357a8561d0a9515b20f109a1ec73c56d247c1aec1660716f-QdypWAnYU2MzI3jh',
        },
      },
    }),
  ],
  exports: [MailerModule],
})
export class MailModule {}
