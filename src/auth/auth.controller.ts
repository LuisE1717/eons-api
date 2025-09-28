import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Query,
  Headers,
  Res,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto, LogOutData } from './dto/login.dto';
import { AccessGuard } from './auth.guard';
import { RefreshGuard } from './auth.refresGuard';
import { ResetPasswordRequestDto } from './dto/reset-password-request.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JWTUser } from 'src/lib/jwt';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  private readonly isDevelopment = process.env.NODE_ENV === 'development';
  private readonly frontendUrl = this.isDevelopment 
    ? 'http://localhost:4321' 
    : 'https://eons.es';
  
  constructor(private readonly authService: AuthService) {}
  
  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res() res: Response
  ) {
    try {
      this.logger.debug(`📝 Attempting registration for: ${registerDto.email}`);
      
      const result = await this.authService.register(registerDto);
      
      // 🔄 SIEMPRE redirigir a verificación después del registro
      this.logger.debug(`📧 Registration successful, sending verification email: ${registerDto.email}`);
      
      return res.status(HttpStatus.OK).json({
        success: true,
        requiresVerification: true,
        message: 'Registration successful. Please verify your email.',
        email: registerDto.email,
        redirectTo: `${this.frontendUrl}/auth/email-verification?email=${encodeURIComponent(registerDto.email)}`,
        // No enviar tokens hasta que el email esté verificado
      });
    } catch (error) {
      this.logger.error(`❌ Registration error: ${error.message}`, error.stack);
      
      // 🔄 Si el usuario ya existe, redirigir a verificación
      if (error.message.includes('already exists') || error.status === 409) {
        this.logger.debug(`🔄 User already exists, sending verification: ${registerDto.email}`);
        
        try {
          await this.authService.sendVerificationEmail(registerDto.email, 'es');
          
          return res.status(HttpStatus.OK).json({
            success: true,
            requiresVerification: true,
            userExists: true,
            message: 'An account with this email already exists. We have sent a verification email.',
            email: registerDto.email,
            redirectTo: `${this.frontendUrl}/auth/email-verification?email=${encodeURIComponent(registerDto.email)}&userExists=true`,
          });
        } catch (verificationError) {
          this.logger.error(`❌ Error sending verification for existing user: ${verificationError.message}`);
        }
      }
      
      // Manejar otros errores
      return res.status(error.status || HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message || 'Registration failed',
        requiresVerification: false,
      });
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      this.logger.debug(`🔐 Attempting login for: ${loginDto.email}`);
      
      const result = await this.authService.login(loginDto);
      
      // 🔄 SIEMPRE verificar el estado de verificación del email
      if (!result.valid) {
        this.logger.debug(`📧 User not verified, sending verification: ${loginDto.email}`);
        
        try {
          await this.authService.sendVerificationEmail(loginDto.email, 'es');
        } catch (emailError) {
          this.logger.error(`❌ Error sending verification email: ${emailError.message}`);
        }
        
        // Redirigir a verificación
        return res.status(HttpStatus.OK).json({
          requiresVerification: true,
          message: 'Please verify your email address to continue. A verification email has been sent.',
          email: loginDto.email,
          redirectTo: `${this.frontendUrl}/auth/email-verification?email=${encodeURIComponent(loginDto.email)}&fromLogin=true`,
          // No enviar tokens hasta que el email esté verificado
        });
      }
      
      // ✅ Usuario verificado - enviar tokens
      this.logger.debug(`✅ Login successful for verified user: ${loginDto.email}`);
      
      return res.status(HttpStatus.OK).json({
        ...result,
        requiresVerification: false,
        success: true,
        redirectTo: `${this.frontendUrl}/services`,
      });
      
    } catch (error) {
      this.logger.error(`❌ Login error: ${error.message}`, error.stack);
      
      // 🔄 En caso de error de credenciales, verificar si el usuario existe y necesita verificación
      if (error.status === HttpStatus.UNAUTHORIZED) {
        try {
          const user = await this.authService.checkUserExists(loginDto.email);
          if (user && !user.isEmailVerified) {
            this.logger.debug(`🔄 Unverified user attempted login, sending verification: ${loginDto.email}`);
            
            await this.authService.sendVerificationEmail(loginDto.email, 'es');
            
            return res.status(HttpStatus.OK).json({
              requiresVerification: true,
              message: 'Please verify your email address to continue. A verification email has been sent.',
              email: loginDto.email,
              redirectTo: `${this.frontendUrl}/auth/email-verification?email=${encodeURIComponent(loginDto.email)}&fromLogin=true`,
            });
          }
        } catch (checkError) {
          this.logger.debug(`ℹ️ User not found or error checking: ${loginDto.email}`);
        }
      }
      
      // Para otros errores, devolver error normal
      const status = error.status || HttpStatus.BAD_REQUEST;
      return res.status(status).json({
        success: false,
        message: error.message || 'Login failed',
        requiresVerification: false,
      });
    }
  }

  @Get('login')
  @UseGuards(RefreshGuard)
  recoverSection(@Headers('authorization') refreshToken: string) {
    return this.authService.recoverSection(refreshToken);
  }

  @Post('logout')
  @UseGuards(AccessGuard)
  logOut(@Body() logout: LogOutData, @Request() req: { user: JWTUser }) {
    const data = {
      providerId: logout.providerId,
      userId: req.user.id,
    };
    return this.authService.logOut(data);
  }

  @Get('profile')
  @UseGuards(AccessGuard)
  profile(@Request() req) {
    const userId = typeof req?.user?.id === 'number' 
      ? req.user.id.toString() 
      : req.user.id;
    
    return this.authService.getProfile(userId);
  }

  @Post('request-password-reset')
  requestPasswordReset(
    @Body() resetPasswordRequestDto: ResetPasswordRequestDto,
  ) {
    return this.authService.requestPasswordReset(resetPasswordRequestDto);
  }

  @UseGuards(AccessGuard)
  @Post('reset-password')
  resetPassword(
    @Request() req,
    @Body() resetPasswordDto: ResetPasswordDto
    ) {
    // El email debe venir del token JWT del usuario autenticado
    const userEmail = req.user.email;
    return this.authService.resetPassword(resetPasswordDto, userEmail);
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string, @Res() res: Response) {
    this.logger.debug(`🔍 Verification token received: ${token}`);
    
    if (!token) {
      this.logger.error('❌ No token provided in query parameters');
      return res.redirect(`${this.frontendUrl}/auth/email-verification?error=no_token`);
    }

    try {
      const result = await this.authService.verifyEmail(token);
      this.logger.debug(`✅ Verification result: ${JSON.stringify(result)}`);
      
      if (result.success) {
        // Redirección a verification-success
        return res.redirect(`${this.frontendUrl}/auth/verification-success?success=true`);
      } else {
        return res.redirect(`${this.frontendUrl}/auth/email-verification?error=${encodeURIComponent(result.message)}`);
      }
    } catch (error) {
      this.logger.error(`❌ Error in verify-email endpoint: ${error.message}`, error.stack);
      return res.redirect(`${this.frontendUrl}/auth/email-verification?error=${encodeURIComponent(error.message)}`);
    }
  }

  @Get('request-verify-email')
  async sendVerificationEmail(
    @Query('email') email: string,
    @Query('lang') lang: string
    ) {
    return this.authService.sendVerificationEmail(email, lang);
  }

  @Post('resend-verification')
  async resendVerificationEmail(@Body() body: { email: string, lang?: string }) {
    try {
      const result = await this.authService.sendVerificationEmail(body.email, body.lang || 'es');
      return {
        success: true,
        message: 'Correo de verificación enviado exitosamente'
      };
    } catch (error) {
      this.logger.error(`❌ Error al reenviar correo de verificación: ${error.message}`);
      throw error;
    }
  }

  // 🔄 NUEVO ENDPOINT: Verificar estado de usuario
  @Get('check-user')
  async checkUser(@Query('email') email: string) {
    try {
      const user = await this.authService.checkUserExists(email);
      return {
        exists: !!user,
        isVerified: user?.isEmailVerified || false,
        email: email
      };
    } catch (error) {
      this.logger.error(`❌ Error checking user: ${error.message}`);
      return {
        exists: false,
        isVerified: false,
        email: email
      };
    }
  }
}
