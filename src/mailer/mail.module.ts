import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('BREVO_HOST'),
          port: 587,
          secure: false,
          auth: {
            user: configService.get<string>('BREVO_USER'),
            pass: configService.get<string>('BREVO_PASSWORD'),
          },
          tls: {
            rejectUnauthorized: false,
          },
          connectionTimeout: 10000,
          greetingTimeout: 10000,
          socketTimeout: 10000,
        },
        defaults: {
          from: '"EONS" <infoeons.es@gmail.com>',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [MailerModule, EmailService],
})
export class MailModule {}
