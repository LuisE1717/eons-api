import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
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
  constructor(
    private readonly userService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
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

    return this.sendUser(user);
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
      esencia: 0,
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
      esencia: 0,
    });

    return this.sendUser(user);
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

  private async sendUser(user: usuario) {
    const payload = { id: user.id, email: user.email };

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

    const resetUrl = `${process.env.FURL}/auth/change-password/${token}/${email}`;

    if (lang == 'es') {
      const htmlContent = `
      <p>Estimado(a) ${user.email},</p>
      <p>Hemos recibido una solicitud para restablecer la contraseña de su cuenta en nuestra plataforma. Para completar este proceso y asegurar que solo
       usted tenga acceso a nuestros servicios de excelencia, haga clic en el enlace a continuación:</p>
      <p><a href="${resetUrl}">Restablecer Contraseña</a></p>
      <p>Si no realizó esta solicitud, le recomendamos omitir este mensaje para mantener la seguridad de su cuenta.</p>

      <p>Agradecemos su confianza en un servicio reservado solo para quienes comparten nuestro compromiso con la más alta calidad y distinción.</p>

      <p>Cordialmente,</p>
      <p>Equipo EONS</p>
    `;

      await this.mailerService.sendMail({
        from: '"EONS" <infoeons.es@gmail.com>',
        to: email,
        subject: 'Solicitud de restablecimiento de contraseña',
        html: htmlContent,
        context: {
          name: user.email,
          resetUrl,
        },
      });

      return { message: 'Password reset email sent', token: token };
    } else {
      const htmlContent = `
      <p>Dear ${user.email},</p>
      <p>We have received a request to reset the password for your account on our platform. To complete this process and ensure that only you have access to
       our services of excellence, please click on the link below:</p>
      <p><a href="${resetUrl}">Reset Password</a></p>
      <p>If you did not make this request, we recommend ignoring this message to maintain the security of your account.</p>

      <p>We appreciate your trust in a service reserved exclusively for those who share our commitment to the highest quality and distinction.</p>

      <p>Sincerely,</p>
      <p>EONS Team</p>
    `;

      await this.mailerService.sendMail({
        from: '"EONS" <infoeons.es@gmail.com>',
        to: email,
        subject: 'Password Reset Request',
        html: htmlContent,
        context: {
          name: user.email,
          resetUrl,
        },
      });
      return { message: 'Password reset email sent', token: token };
    }
  }

  async resetPassword({ newPassword }: ResetPasswordDto, userEmail: string) {
    const user = await this.userService.findOneByEmail(userEmail);
    if (!user) {
      throw new NotFoundException('Email does not exist');
    }

    // try {
    //    const payload = await this.jwtService.verifyAsync(token);
    //    email = payload.email;
    //  } catch (e) {
    //    throw new BadRequestException('Invalid or expired token');
    // }

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

    const payload = { email: user.email };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
      secret: jwtConstants.accessSecret,
    });

    const resetUrl = `${process.env.BURL}/auth/verify-email/?token=${token}`;

    if (lang == 'es') {
      const htmlContent = `
        <p>Estimado(a) ${email},</p>
        <p>Nos complace informarle que está a un paso de completar su proceso de autenticación en nuestra plataforma exclusiva. Para finalizar su verificación y 
        asegurar su acceso a este entorno reservado para quienes buscan la excelencia, haga clic en el enlace a continuación:</p>
        <p><a href="${resetUrl}">Verificar Correo Electrónico</a></p>
       <p>Si usted no solicitó esta verificación, le sugerimos omitir este mensaje para mantener la integridad de su cuenta.</p>

      <p>Agradecemos su confianza en un servicio reservado solo para quienes comparten nuestro compromiso con la más alta calidad y distinción.</p>

      <p>Cordialmente,</p>
      <p>Equipo EONS</p>
      `;
      try {
        await this.mailerService.sendMail({
          from: '"EONS" <infoeons.es@gmail.com>',
          to: email,
          subject: 'Verifica tu correo electrónico',
          html: htmlContent,
          context: {
            resetUrl,
          },
        });
      } catch (error) {
        console.log('Error es:', error);
      }
      return token;
    } else {
      const htmlContent = `
      <p>Dear ${email},</p>
      <p>We are pleased to inform you that you are one step away from completing your authentication process on our exclusive platform. To finalize your 
      verification and ensure access to this environment reserved for those pursuing excellence, please click on the link below:</p>
      <p><a href="${resetUrl}">Verify Email Address</a></p>
      <p>If you did not request this verification, we recommend ignoring this message to maintain the integrity of your account.</p>
      <p>We appreciate your trust in a service reserved exclusively for those who share our commitment to the highest quality and distinction.</p>

      <p>Sincerely,</p>
      <p>EONS Team</p>
    `;
      try {
        await this.mailerService.sendMail({
          from: '"EONS" <infoeons.es@gmail.com>',
          to: email,
          subject: 'Verify your email',
          html: htmlContent,
          context: {
            resetUrl,
          },
        });
      } catch (error) {
        console.log('Error en:', error);
      }

      return token;
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
      // this.notificationsService.createNotification({
      //   nombre: 'Instrucciones de uso leidas',
      //   id_usuario: userId,
      //   tipo: 'readDocumentation',
      //   descripcion: 'A leido las instrucciones de uso',
      //   estado: false,
      // });
      // return { success: true };
    } catch (error) {
      throw new Error('Token inválido o expirado');
    }
  }

  async verifyEmail(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.accessSecret,
      });
      const email = payload.email;
      const user = await this.userService.findOneByEmail(email);
      if (user) {
        user.isEmailVerified = true;
        await this.userService.updateUsuario(user, user.id);
        this.notificationsService.createNotification({
          nombre: 'Cuenta Verificada',
          id_usuario: user.id,
          tipo: 'validAcount',
          descripcion: 'Su cuenta ha sido verificada con éxito',
          estado: false,
        });
        return { success: true };
      } else {
        throw new Error('Correo electrónico no encontrado');
      }
    } catch (error) {
      throw new Error('Token inválido o expirado');
    }
  }

  async recoverSection(refreshToken: string) {
    try {
      // eslint-disable-next-line prefer-const
      let [type, token] = refreshToken.split(' ') ?? [];
      token = type === 'Bearer' ? token : undefined;

      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.refreshSecret,
      });

      const email = payload.email;
      const user = await this.userService.findOneByEmail(email);
      if (user) {
        return this.sendUser(user);
      } else {
        throw new Error('Correo electrónico no encontrado');
      }
    } catch (error) {
      throw new Error('Token inválido o expirado');
    }
  }

  async getProfile(userId: string) {
    try {
      const notificaciones =
        await this.notificationsService.findAllUnreadNotifications(userId);
      const user = await this.userService.findOneById(userId);
      if (notificaciones && user) {
        return this.sendProfile(user, notificaciones);
      } else {
        throw new Error('Correo electrónico no encontrado');
      }
    } catch (error) {
      throw new Error('Token inválido o expirado');
    }
  }
}
