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
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
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
      // Redirección dinámica según el entorno - CORREGIDO
      return res.redirect(`${this.frontendUrl}/auth/email-verification?error=no_token`);
    }

    try {
      const result = await this.authService.verifyEmail(token);
      this.logger.debug(`✅ Verification result: ${JSON.stringify(result)}`);
      
      if (result.success) {
        // Redirección dinámica a verification-success - CORREGIDO
        return res.redirect(`${this.frontendUrl}/auth/verification-success?success=true`);
      } else {
        // Redirección dinámica con error - CORREGIDO
        return res.redirect(`${this.frontendUrl}/auth/email-verification?error=${encodeURIComponent(result.message)}`);
      }
    } catch (error) {
      this.logger.error(`❌ Error in verify-email endpoint: ${error.message}`, error.stack);
      // Redirección dinámica con error - CORREGIDO
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
