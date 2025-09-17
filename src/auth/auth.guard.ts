// src/auth/auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccessGuard implements CanActivate {
  private readonly logger = new Logger(AccessGuard.name);

  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    this.logger.debug(`🔐 Verificando token: ${token ? token.substring(0, 20) + '...' : 'No token'}`);
    
    if (!token) {
      this.logger.error('❌ Token no proporcionado');
      throw new UnauthorizedException('Token no proporcionado');
    }
    
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      
      this.logger.debug(`✅ Token válido para usuario: ${payload.sub}`);
      
      // Verificar que el usuario existe en la base de datos
      const user = await this.prisma.usuario.findUnique({
        where: { id: payload.sub },
      });
      
      if (!user) {
        this.logger.error(`❌ Usuario no existe: ${payload.sub}`);
        throw new UnauthorizedException('Usuario no existe');
      }
      
      request['user'] = {
        id: payload.sub,
        email: payload.email,
        type: payload.type,
      };

      this.logger.debug(`✅ Autenticación exitosa para: ${payload.email}`);
      
    } catch (error) {
      this.logger.error(`❌ Error de autenticación: ${error.message}`);
      
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expirado');
      } else if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Token inválido');
      } else {
        throw new UnauthorizedException('Token inválido o expirado');
      }
    }
    
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return undefined;
    }
    
    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
