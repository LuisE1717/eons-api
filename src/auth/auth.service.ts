import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { UsuariosService } from 'src/usuario/usuario.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto, LogOutDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResetPasswordRequestDto } from './dto/reset-password-request.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { notificaciones, usuario } from '@prisma/client';
import { jwtConstants } from './constants/jwt.constant';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly isDevelopment = process.env.NODE_ENV === 'development';
  private readonly frontendUrl = this.isDevelopment 
    ? 'http://localhost:4321' 
    : 'https://eons.es';
  private readonly backendUrl = this.isDevelopment 
    ? 'http://localhost:3000' 
    : 'https://api.eons.es';

  constructor(
    private readonly userService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly http: HttpService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async register({ email, password, type }: RegisterDto) {
    // Verificar si el usuario ya existe
    const existingUser = await this.userService.findOneByEmail(email);

    if (existingUser) {
        // 🔄 USUARIO YA EXISTE - Enviar a verificación de email
        this.logger.log(`User ${email} already exists, sending verification email`);
        
        try {
            // Enviar email de verificación
            await this.sendVerificationEmail(email, 'es');
            
            // Retornar respuesta especial para redirección
            return {
                success: true,
                message: 'An account with this email already exists. We have sent a verification email to your address.',
                requiresVerification: true,
                email: email,
                userExists: true
            };
            
        } catch (emailError) {
            this.logger.error('Error sending verification email:', emailError);
            throw new BadRequestException('An account with this email already exists. Please try to login.');
        }
    }

    // ✅ USUARIO NUEVO - Crear cuenta
    const hashedPassword = await bcryptjs.hash(password, 10);
    
    try {
        const user = await this.userService.createUsuario({
            email,
            password: hashedPassword,
            type,
            esencia: 0,
            isEmailVerified: false
        });

        // Enviar email de verificación automáticamente
        try {
            await this.sendVerificationEmail(email, 'es');
            this.logger.log(`Verification email sent to new user: ${email}`);
        } catch (emailError) {
            this.logger.error('Error sending verification email:', emailError);
            // No interrumpir el registro si falla el email
        }

        return {
            success: true,
            message: 'Registration successful. Please check your email for verification.',
            requiresVerification: true,
            email: user.email,
            userExists: false
        };
        
    } catch (error) {
        this.logger.error(`Error creating user ${email}:`, error);
        
        if (error.code === 'P2002') {
            // 🔄 Si ocurre error de duplicado durante la creación, enviar a verificación
            try {
                await this.sendVerificationEmail(email, 'es');
                return {
                    success: true,
                    message: 'An account with this email already exists. We have sent a verification email to your address.',
                    requiresVerification: true,
                    email: email,
                    userExists: true
                };
            } catch (emailError) {
                throw new BadRequestException('An account with this email already exists. Please try to login.');
            }
        }
        
        throw new BadRequestException('Error creating user account');
    }
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findOneByEmail(email);
    
    if (!user) {
        // 🔄 USUARIO NO EXISTE - Pero lo tratamos como si existiera para seguridad
        this.logger.log(`Login attempt for non-existent user: ${email}`);
        
        try {
            // Intentar enviar email de verificación
            await this.sendVerificationEmail(email, 'es');
            
            return {
                requiresVerification: true,
                message: 'Invalid credentials. We have sent a verification email to your address. Please verify your email to continue.',
                email: email,
                verified: false
            };
            
        } catch (emailError) {
            this.logger.error('Error sending verification email during login:', emailError);
            throw new UnauthorizedException('Invalid credentials. Please verify your email address.');
        }
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    
    if (!isPasswordValid) {
        // 🔄 CONTRASEÑA INCORRECTA - Enviar a verificación
        this.logger.log(`Invalid password for user: ${email}`);
        
        try {
            // Enviar email de verificación para ayudar al usuario
            await this.sendVerificationEmail(email, 'es');
            
            return {
                requiresVerification: true,
                message: 'Invalid credentials. We have sent a verification email to your address. Please verify your email to continue.',
                email: user.email,
                verified: false
            };
            
        } catch (emailError) {
            this.logger.error('Error sending verification email during login:', emailError);
            throw new UnauthorizedException('Invalid credentials. Please verify your email address.');
        }
    }

    // ✅ CREDENCIALES VÁLIDAS - Verificar si el email está verificado
    if (!user.isEmailVerified) {
        this.logger.log(`User ${email} not verified, sending verification email`);
        
        try {
            await this.sendVerificationEmail(email, 'es');
            
            return {
                requiresVerification: true,
                message: 'Your account is not verified. We have sent a verification email to your address.',
                email: user.email,
                verified: false
            };
        } catch (emailError) {
            this.logger.error('Error sending verification email:', emailError);
            throw new UnauthorizedException('Your account is not verified. Please check your email for verification instructions.');
        }
    }

    // ✅ TODO CORRECTO - Login exitoso
    const loginResult = await this.sendUser(user);
    return {
        ...loginResult,
        requiresVerification: false,
        verified: true
    };
  }

  async resetPassword({ newPassword }: ResetPasswordDto, email: string) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new BadRequestException('Email does not exist');
    }
    
    // Actualizar la contraseña del usuario
    const updatedUser = {
      ...user,
      password: await bcryptjs.hash(newPassword, 10),
    };
    
    await this.userService.updateUsuario(updatedUser, user.id);
    return { message: 'Password successfully reset' };
  }

  async google({ email, password }: RegisterDto) {
    const user = await this.userService.findOneByEmail(email);

    if (user) {
      return this.sendUser(user);
    }

    await this.userService.createUsuario({
      email,
      password: await bcryptjs.hash(password, 10),
      type: 'google',
      isEmailVerified: true,
      esencia:0
    });

    return this.sendUser(user);
  }

  async microsoft({ email, password }: RegisterDto) {
    const user = await this.userService.findOneByEmail(email);

    if (user) {
      return this.sendUser(user);
    }

    await this.userService.createUsuario({
      email,
      password: await bcryptjs.hash(password, 10),
      type: 'microsoft',
      isEmailVerified: true,
      esencia:0
    });

    return this.sendUser(user);
  }

  async logOut({ providerId, userId }: LogOutDto) {
    const user = await this.userService.findOneById(userId);
    if (!user) {
      throw new NotFoundException('session not found');
    }

    const type = user.type;
    if (type == 'google') {
      const params = {
        token: providerId,
      };
      try {
        return await this.http
          .post(`https://oauth2.googleapis.com/revoke`, {
            params,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          })
          .pipe(map((response) => response.data))
          .toPromise();
      } catch (error) {
        //console.log(error);
      }
    } else if (type == 'microsoft') {
    }

    return { message: 'User Log-out' };
  }

  private async sendUser(user: usuario) {
    const payload = {
      sub: user.id,
      id: user.id,
      email: user.email,
      type: user.type,
    };

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: jwtConstants.refreshSecret,
    });

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '6h',
      secret: jwtConstants.accessSecret,
    });

    return {
      refreshToken,
      accessToken,
      email: user.email,
      type: user.type,
      valid: user.isEmailVerified,
      essence: user.esencia,
      verified: user.isEmailVerified,
    };
  }

  private async sendProfile(user: usuario, notificaciones: notificaciones[]) {
    return {
      essence: user.esencia,
      notificaciones,
    };
  }

  async requestPasswordReset({ email, lang }: ResetPasswordRequestDto) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new BadRequestException('Email does not exist');
    }

    const token = await this.jwtService.signAsync(
      { email },
      {
        expiresIn: '1h',
        secret: jwtConstants.accessSecret,
      },
    );

    // URL dinámica según el entorno - CORREGIDO
    const resetUrl = `${this.frontendUrl}/auth/change-password/${token}/${email}`;
    

    if(lang == 'es'){
      const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #333; text-align: center;">Restablecer Contraseña</h2>
        <p>Hola ${user.email},</p>
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

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Solicitud de restablecimiento de contraseña',
        html: htmlContent,
      });
    } catch (error) {
      this.logger.error('Error sending password reset email:', error);
      throw new BadRequestException('Error sending email');
    }

    return { message: 'Password reset email sent', token: token };
    }
    else{
      const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #333; text-align: center;">Password Reset</h2>
        <p>Hello ${user.email},</p>
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

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Password Reset Request',
        html: htmlContent,
      });
    } catch (error) {
      this.logger.error('Error sending password reset email:', error);
      throw new BadRequestException('Error sending email');
    }

    return { message: 'Password reset email sent', token: token };
    }
  }

  async sendVerificationEmail(email: string,lang: string) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new BadRequestException('Email does not exist');
    } else if (user.isEmailVerified) {
      throw new BadRequestException('This user its valid');
    }

    const payload = { email: user.email, id: user.id };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
      secret: jwtConstants.accessSecret,
    });

    // URL dinámica según el entorno - CORREGIDO
    const resetUrl = `${this.backendUrl}/auth/verify-email/?token=${token}`;


    if(lang == 'es'){
      const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #333; text-align: center;">Verifica tu correo electrónico</h2>
        <p>Hola ${email},</p>
        <p>Por favor verifica tu correo electrónico haciendo clic en el siguiente botón:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #8a2be2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            Verificar Email
          </a>
        </div>
        <p>Si no solicitaste este cambio, puedes ignorar este correo electrónico.</p>
        <p>Saludos,</p>
        <p>El equipo de EONS</p>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
        <p style="font-size: 12px; color: #666; text-align: center;">
          Si tienes problemas para hacer clic en el botón, copia y pega la siguiente URL en tu navegador:<br>
          ${resetUrl}
        </p>
      </div>
    `;

      try {
        await this.mailerService.sendMail({
          to: email,
          subject: 'Verifica tu correo electrónico',
          html: htmlContent,
        });
      } catch (error) {
        this.logger.error('Error sending verification email:', error);
        throw new BadRequestException('Error sending verification email');
      }
    }
    else{
      const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #333; text-align: center;">Verify your email address</h2>
        <p>Hello ${email},</p>
        <p>Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #8a2be2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            Verify Email
          </a>
        </div>
        <p>If you did not request this change, you can ignore this email.</p>
        <p>Regards,</p>
        <p>The EONS Team</p>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
        <p style="font-size: 12px; color: #666; text-align: center;">
          If you're having trouble clicking the button, copy and paste the URL below into your web browser:<br>
          ${resetUrl}
        </p>
      </div>
    `;

      try {
        await this.mailerService.sendMail({
          to: email,
          subject: 'Verify your email address',
          html: htmlContent,
        });
      } catch (error) {
        this.logger.error('Error sending verification email:', error);
        throw new BadRequestException('Error sending verification email');
      }
    }

    return { message: 'Verification email sent' };
  }

  async verifyEmail(token: string) {
    try {
      this.logger.debug(`🔍 Attempting to verify email with token: ${token}`);
      
      // Verificar y decodificar el token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.accessSecret,
      });

      this.logger.debug(`✅ Token payload: ${JSON.stringify(payload)}`);

      if (!payload || !payload.email) {
        this.logger.error('❌ Invalid token payload: missing email');
        return { success: false, message: 'Invalid token payload' };
      }

      // Buscar usuario por email
      const user = await this.userService.findOneByEmail(payload.email);

      if (!user) {
        this.logger.warn(`❌ User not found for email: ${payload.email}`);
        return { success: false, message: 'User not found' };
      }

      if (user.isEmailVerified) {
        this.logger.debug(`ℹ️ Email already verified for user: ${user.email}`);
        return { success: true, message: 'Email already verified' };
      }

      // Actualizar usuario como verificado
      await this.userService.updateUsuario(
        { ...user, isEmailVerified: true },
        user.id,
      );

      this.logger.debug(`🎉 Email verified successfully for user: ${user.email}`);
      return { success: true, message: 'Email verified successfully' };
    } catch (error) {
      this.logger.error(`❌ Email verification failed: ${error.message}`, error.stack);
      
      // Manejar diferentes tipos de errores de JWT
      if (error.name === 'TokenExpiredError') {
        return { success: false, message: 'Token expired. Please request a new verification email.' };
      } else if (error.name === 'JsonWebTokenError') {
        return { success: false, message: 'Invalid token format.' };
      } else if (error.name === 'NotBeforeError') {
        return { success: false, message: 'Token not yet valid.' };
      } else {
        return { success: false, message: 'Invalid or expired token' };
      }
    }
  }


  async recoverSection(refreshToken: string) {
    try {
      // Extraer el token del header "Bearer token"
      const token = refreshToken.replace('Bearer ', '');
      
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.refreshSecret,
      });

      const user = await this.userService.findOneById(payload.id);
      
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return this.sendUser(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async getProfile(userId: string) {
    try {
      const notificaciones = await this.notificationsService.findAllUnreadNotifications(userId);
      const user = await this.userService.findOneById(userId);
      
      if (user) {
        return this.sendProfile(user, notificaciones);
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      throw new Error('Error retrieving profile');
    }
  }
}
