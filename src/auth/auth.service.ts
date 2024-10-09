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
import { EmailService } from 'src/mailer/email.service';
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
    private readonly emailService: EmailService,
    private readonly http: HttpService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async register({ email, password, type }: RegisterDto) {
    let user = await this.userService.findOneByEmail(email);

    if (user) {
      const isPasswordValid = await bcryptjs.compare(password, user?.password);
      if (isPasswordValid) {
        return this.sendUser(user);
      } else {
        throw new UnauthorizedException('User Alredy exist');
      }
    }

    user = await this.userService.createUsuario({
      email,
      password: await bcryptjs.hash(password, 10),
      type,
      esencia: 0,
    });

    try {
      await this.sendVerificationEmail(email, 'es');
    } catch (error) {
      this.logger.error('Error sending verification email:', error);
    }

    return this.sendUser(user);
  }

  async googleLogin({ email, password }: RegisterDto) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Usuario no existe');
    }

    return this.sendUser(user);
  }

  async googleRegister({ email, password }: RegisterDto) {
    const user = await this.userService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException('El usuario ya existe');
    }

    const newUser = await this.userService.createUsuario({
      email,
      password: await bcryptjs.hash(password, 10),
      type: 'google',
      isEmailVerified: true,
      esencia: 0,
    });

    return this.sendUser(newUser);
  }

  async google({ email, password }: RegisterDto) {
    const user = await this.userService.findOneByEmail(email);

    if (user) {
      return this.sendUser(user);
    }

    const newUser = await this.userService.createUsuario({
      email,
      password: await bcryptjs.hash(password, 10),
      type: 'google',
      isEmailVerified: true,
      esencia: 0,
    });

    return this.sendUser(newUser);
  }

  async microsoft({ email, password }: RegisterDto) {
    const user = await this.userService.findOneByEmail(email);

    if (user) {
      return this.sendUser(user);
    }

    const newUser = await this.userService.createUsuario({
      email,
      password: await bcryptjs.hash(password, 10),
      type: 'microsoft',
      isEmailVerified: true,
      esencia: 0,
    });

    return this.sendUser(newUser);
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('email is wrong');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('password is wrong');
    }

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
        console.log(error);
      }
    } else if (type == 'microsoft') {
    }

    return { message: 'User Log-out' };
  }

  async requestPasswordReset({ email, lang }: ResetPasswordRequestDto) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      this.logger.warn(`Password reset request for non-existent user: ${email}`);
      return;
    }

    // Incluir tanto email como id en el payload del token
    const payload = { email: user.email, id: user.id };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
      secret: jwtConstants.accessSecret,
    });

    try {
      await this.emailService.sendPasswordResetEmail(
        email,
        token,
        lang,
        this.frontendUrl,
      );
    } catch (error) {
      this.logger.error('Error sending password reset email:', error);
      throw new BadRequestException('Error sending email');
    }

    return { message: 'Password reset email sent', token: token };
  }

  async resetPassword({ newPassword }: ResetPasswordDto, userEmail: string) {
    const user = await this.userService.findOneByEmail(userEmail);
    if (!user) {
      throw new NotFoundException('Email does not exist');
    }

<<<<<<< HEAD
=======
    // try {
    //    const payload = await this.jwtService.verifyAsync(token);
    //    email = payload.email;
    //  } catch (e) {
    //    throw new BadRequestException('Invalid or expired token');
    // }

>>>>>>> fa032c9 (Fix reset password problem)
    user.password = await bcryptjs.hash(newPassword, 10);
    await this.userService.updateUsuario(
      { password: user.password, email: user.email, type: user.type },
      user.id,
    );

    return { message: 'Password successfully reset' };
  }

  async sendVerificationEmail(email: string, lang: string) {
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

    try {
      await this.emailService.sendVerificationEmail(
        email,
        token,
        lang,
        this.backendUrl,
      );
    } catch (error) {
      this.logger.error('Error sending verification email:', error);
      throw new BadRequestException('Error sending verification email');
    }

    return { message: 'Verification email sent' };
  }

  async verifyEmail(token: string) {
    try {
      this.logger.debug(`🔍 Attempting to verify email with token: ${token}`);
      
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.accessSecret,
      });

      this.logger.debug(`✅ Token payload: ${JSON.stringify(payload)}`);

      if (!payload || !payload.email) {
        this.logger.error('❌ Invalid token payload: missing email');
        return { success: false, message: 'Invalid token payload' };
      }

      const user = await this.userService.findOneByEmail(payload.email);

      if (!user) {
        this.logger.warn(`❌ User not found for email: ${payload.email}`);
        return { success: false, message: 'User not found' };
      }

      if (user.isEmailVerified) {
        this.logger.debug(`ℹ️ Email already verified for user: ${user.email}`);
        return { success: true, message: 'Email already verified' };
      }

      await this.userService.updateUsuario(
        { ...user, isEmailVerified: true },
        user.id,
      );

      this.notificationsService.createNotification({
        nombre: 'Cuenta Verificada',
        id_usuario: user.id,
        tipo: 'validAcount',
        descripcion: 'Su cuenta ha sido verificada con éxito',
        estado: false,
      });

      this.logger.debug(`🎉 Email verified successfully for user: ${user.email}`);
      return { success: true, message: 'Email verified successfully' };
    } catch (error) {
      this.logger.error(`❌ Email verification failed: ${error.message}`, error.stack);
      
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

  async readDocumentation(userId: string) {
    try {
      const user = await this.userService.findOneById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      user.readDocumentation = true;
      await this.userService.updateUsuario(user, userId);
      return { success: true };
    } catch (error) {
      throw new Error('Token inválido o expirado');
    }
  }

  async recoverSection(refreshToken: string) {
    try {
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
    };
  }

  private async sendProfile(user: usuario, notificaciones: notificaciones[]) {
    return {
      essence: user.esencia,
      isVerified: user.isEmailVerified,
      isRead: user.readDocumentation,
      notificaciones,
    };
  }
}
