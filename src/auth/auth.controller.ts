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
  HttpException,
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

// Importar las funciones type guard del servicio
import { 
  isVerificationResponse, 
  isLoginSuccessResponse,
  LoginSuccessResponse 
} from './auth.service';

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
      this.logger.log(`Registration attempt for: ${registerDto.email}`);
      
      const result = await this.authService.register(registerDto);
      
      // 🔄 SI REQUIERE VERIFICACIÓN (usuario existente o nuevo)
      if (result.requiresVerification) {
        this.logger.log(`Registration requires verification for: ${registerDto.email}`);
        
        // Guardar email en cookie para el frontend
        res.cookie('eons_user', registerDto.email, { 
          httpOnly: false, 
          secure: !this.isDevelopment,
          maxAge: 24 * 60 * 60 * 1000 // 24 horas
        });
        
        return res.status(HttpStatus.OK).json({
          success: true,
          message: result.message,
          requiresVerification: true,
          redirectTo: `${this.frontendUrl}/auth/email-verification`,
          email: registerDto.email,
          userExists: result.userExists || false
        });
      }
      
      // ✅ REGISTRO EXITOSO (no debería ocurrir con la nueva lógica)
      return res.status(HttpStatus.CREATED).json(result);
      
    } catch (error) {
      this.logger.error(`Registration error for ${registerDto.email}:`, error);
      
      // 🔄 MANEJAR ERRORES DE USUARIO EXISTENTE
      if (error.message.includes('already exists')) {
        try {
          // Intentar enviar email de verificación
          await this.authService.sendVerificationEmail(registerDto.email, 'es');
          
          res.cookie('eons_user', registerDto.email, { 
            httpOnly: false, 
            secure: !this.isDevelopment,
            maxAge: 24 * 60 * 60 * 1000
          });
          
          return res.status(HttpStatus.OK).json({
            success: true,
            message: 'An account with this email already exists. We have sent a verification email to your address.',
            requiresVerification: true,
            redirectTo: `${this.frontendUrl}/auth/email-verification`,
            email: registerDto.email,
            userExists: true
          });
          
        } catch (emailError) {
          this.logger.error('Error sending verification email:', emailError);
          throw new HttpException(
            'An account with this email already exists. Please try to login.',
            HttpStatus.BAD_REQUEST
          );
        }
      }
      
      throw error;
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      this.logger.log(`Login attempt for: ${loginDto.email}`);
      
      const result = await this.authService.login(loginDto);
      
      // 🔄 SI REQUIERE VERIFICACIÓN DE EMAIL - Usar type guard
      if (isVerificationResponse(result)) {
        this.logger.log(`Login requires verification for: ${loginDto.email}`);
        
        res.cookie('eons_user', loginDto.email, { 
          httpOnly: false, 
          secure: !this.isDevelopment,
          maxAge: 24 * 60 * 60 * 1000
        });
        
        return res.status(HttpStatus.OK).json({
          success: true,
          message: result.message,
          requiresVerification: true,
          redirectTo: `${this.frontendUrl}/auth/email-verification`,
          email: loginDto.email,
          verified: false
        });
      }
      
      // ✅ LOGIN EXITOSO - Usar type guard
      if (isLoginSuccessResponse(result)) {
        this.logger.log(`Successful login for: ${loginDto.email}`);
        
        // Guardar tokens en cookies
        res.cookie('eons_token', result.accessToken, { 
          httpOnly: true, 
          secure: !this.isDevelopment,
          maxAge: 6 * 60 * 60 * 1000 // 6 horas
        });
        
        res.cookie('eons_refresh_token', result.refreshToken, { 
          httpOnly: true, 
          secure: !this.isDevelopment,
          maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
        });
        
        res.cookie('eons_user', loginDto.email, { 
          httpOnly: false, 
          secure: !this.isDevelopment,
          maxAge: 24 * 60 * 60 * 1000
        });
        
        return res.status(HttpStatus.OK).json({
          success: true,
          message: 'Login successful',
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          email: result.email,
          type: result.type,
          verified: result.verified,
          redirectTo: `${this.frontendUrl}/services`
        });
      }
      
      // ❌ CASO INESPERADO
      throw new HttpException('Unexpected login response', HttpStatus.INTERNAL_SERVER_ERROR);
      
    } catch (error) {
      this.logger.error(`Login error for ${loginDto.email}:`, error);
      
      // 🔄 MANEJAR ERRORES DE CREDENCIALES - ENVIAR A VERIFICACIÓN
      if (error.message.includes('Invalid credentials') || error.message.includes('Unauthorized')) {
        try {
          // Intentar enviar email de verificación
          await this.authService.sendVerificationEmail(loginDto.email, 'es');
          
          res.cookie('eons_user', loginDto.email, { 
            httpOnly: false, 
            secure: !this.isDevelopment,
            maxAge: 24 * 60 * 60 * 1000
          });
          
          return res.status(HttpStatus.OK).json({
            success: true,
            message: 'We have sent a verification email to your address. Please verify your email to continue.',
            requiresVerification: true,
            redirectTo: `${this.frontendUrl}/auth/email-verification`,
            email: loginDto.email
          });
          
        } catch (emailError) {
          this.logger.error('Error sending verification email during login:', emailError);
          throw new HttpException(
            'Invalid credentials. Please verify your email address.',
            HttpStatus.UNAUTHORIZED
          );
        }
      }
      
      throw error;
    }
  }

  @Get('login')
  @UseGuards(RefreshGuard)
  recoverSection(@Headers('authorization') refreshToken: string): Promise<LoginSuccessResponse> {
    return this.authService.recoverSection(refreshToken);
  }

  @Post('logout')
  @UseGuards(AccessGuard)
  logOut(@Body() logout: LogOutData, @Request() req: { user: JWTUser }, @Res() res: Response) {
    const data = {
      providerId: logout.providerId,
      userId: req.user.id,
    };
    
    // Limpiar cookies
    res.clearCookie('eons_token');
    res.clearCookie('eons_refresh_token');
    res.clearCookie('eons_user');
    
    const result = this.authService.logOut(data);
    
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Logout successful',
      redirectTo: `${this.frontendUrl}/auth`
    });
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
        // ✅ VERIFICACIÓN EXITOSA - Redirigir a verification-success que luego va a services
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
}
