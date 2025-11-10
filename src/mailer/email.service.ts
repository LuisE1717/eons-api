import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly senderEmail: string;

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {
    // El email debe ser el autorizado en Brevo
    this.senderEmail = 'infoeons.es@gmail.com';
  }

  async sendVerificationEmail(email: string, token: string, lang: string = 'es', backendUrl: string): Promise<void> {
    const verificationUrl = `${backendUrl}/auth/verify-email/?token=${token}`;

    if (lang === 'es') {
      const htmlContent = this.getSpanishVerificationTemplate(email, verificationUrl);
      await this.sendEmail(
        email,
        'Verifica tu correo electrónico',
        htmlContent,
      );
    } else {
      const htmlContent = this.getEnglishVerificationTemplate(email, verificationUrl);
      await this.sendEmail(
        email,
        'Verify your email address',
        htmlContent,
      );
    }
  }

  async sendPasswordResetEmail(email: string, token: string, lang: string = 'es', frontendUrl: string): Promise<void> {
    const resetUrl = `${frontendUrl}/auth/change-password/${token}/${email}`;

    if (lang === 'es') {
      const htmlContent = this.getSpanishPasswordResetTemplate(email, resetUrl);
      await this.sendEmail(
        email,
        'Solicitud de restablecimiento de contraseña',
        htmlContent,
      );
    } else {
      const htmlContent = this.getEnglishPasswordResetTemplate(email, resetUrl);
      await this.sendEmail(
        email,
        'Password Reset Request',
        htmlContent,
      );
    }
  }

  private async sendEmail(to: string, subject: string, html: string): Promise<void> {
    try {
      this.logger.log(`📧 Enviando email a: ${to}, Asunto: ${subject}`);

      await this.mailerService.sendMail({
        from: `"EONS" <${this.senderEmail}>`,
        to,
        subject,
        html,
      });

      this.logger.log(`✅ Email enviado exitosamente a: ${to}`);
    } catch (error) {
      this.logger.error(`❌ Error enviando email a ${to}: ${error.message}`, error.stack);
      throw new BadRequestException(`Error sending email: ${error.message}`);
    }
  }

  private getSpanishVerificationTemplate(email: string, verificationUrl: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #333; text-align: center;">Verifica tu correo electrónico</h2>
        <p>Hola ${email},</p>
        <p>Por favor verifica tu correo electrónico haciendo clic en el siguiente botón:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background-color: #8a2be2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            Verificar Email
          </a>
        </div>
        <p>Si no solicitaste este cambio, puedes ignorar este correo electrónico.</p>
        <p>Saludos,</p>
        <p>El equipo de EONS</p>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
        <p style="font-size: 12px; color: #666; text-align: center;">
          Si tienes problemas para hacer clic en el botón, copia y pega la siguiente URL en tu navegador:<br>
          ${verificationUrl}
        </p>
      </div>
    `;
  }

  private getEnglishVerificationTemplate(email: string, verificationUrl: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #333; text-align: center;">Verify your email address</h2>
        <p>Hello ${email},</p>
        <p>Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background-color: #8a2be2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            Verify Email
          </a>
        </div>
        <p>If you did not request this change, you can ignore this email.</p>
        <p>Regards,</p>
        <p>The EONS Team</p>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
        <p style="font-size: 12px; color: #666; text-align: center;">
          If you're having trouble clicking the button, copy and paste the URL below into your web browser:<br>
          ${verificationUrl}
        </p>
      </div>
    `;
  }

  private getSpanishPasswordResetTemplate(email: string, resetUrl: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #333; text-align: center;">Restablecer Contraseña</h2>
        <p>Hola ${email},</p>
        <p>Recibimos una solicitud para restablecer tu contraseña. Haz clic en el siguiente botón para restablecer tu contraseña:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #9370DB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            Restablecer Contraseña
          </a>
        </div>
        <p>Si no solicitaste este cambio, puedes ignorar este correo electrónico.</p>
        <p>Saludos,</p>
        <p>EONS</p>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
        <p style="font-size: 12px; color: #666; text-align: center;">
          Si tienes problemas para hacer clic en el botón, copia y pega la siguiente URL en tu navegador:<br>
          ${resetUrl}
        </p>
      </div>
    `;
  }

  private getEnglishPasswordResetTemplate(email: string, resetUrl: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #333; text-align: center;">Password Reset</h2>
        <p>Hello ${email},</p>
        <p>We have received a request to reset your password. Please click the button below to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #9370DB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>If you did not request this change, you can ignore this email.</p>
        <p>Regards,</p>
        <p>EONS</p>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
        <p style="font-size: 12px; color: #666; text-align: center;">
          If you're having trouble clicking the button, copy and paste the URL below into your web browser:<br>
          ${resetUrl}
        </p>
      </div>
    `;
  }
}
