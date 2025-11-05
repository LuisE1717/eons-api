// auth.guard.ts - CORREGIDO
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
import { jwtConstants } from './constants/jwt.constant';

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
      // Usar la constante correcta del secreto
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.accessSecret,
      });

      this.logger.debug(`✅ Token payload: ${JSON.stringify(payload)}`);
      
      // Verificar que el payload contiene el ID del usuario
      if (!payload || (!payload.sub && !payload.id)) {
        this.logger.error('❌ Token no contiene ID de usuario (sub o id)');
        throw new UnauthorizedException('Token inválido: falta ID de usuario');
      }
      
      // Usar 'sub' o 'id' según lo que contenga el token
      const userId = payload.sub || payload.id;
      
      this.logger.debug(`✅ Token válido para usuario ID: ${userId}`);
      
      // Verificar que el usuario existe en la base de datos
      const user = await this.prisma.usuario.findUnique({
        where: { id: userId },
      });
      
      if (!user) {
        this.logger.error(`❌ Usuario no existe: ${userId}`);
        throw new UnauthorizedException('Usuario no existe');
      }
      
      request['user'] = {
        id: userId,
        email: payload.email,
        type: payload.type,
      };

      this.logger.debug(`✅ Autenticación exitosa para: ${payload.email}`);
      
    } catch (error) {
      this.logger.error(`❌ Error de autenticación: ${error.message}`);
      
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expirado');
      } else if (error.name === 'JsonWebTokenError') {
        // Error de firma inválida - podría ser secreto incorrecto
        this.logger.error(`❌ Error de firma JWT. Verificar secreto: ${jwtConstants.accessSecret.substring(0, 5)}...`);
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
