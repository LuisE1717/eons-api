import { Module } from '@nestjs/common';
import { LanzamientosService } from './lanzamientos.service';
import { LanzamientosController } from './lanzamientos.controller';
import { DialogoAbiertoService } from './dialogo-abierto.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [LanzamientosController],
  providers: [LanzamientosService, DialogoAbiertoService, PrismaService],
  exports: [LanzamientosService],
})
export class LanzamientosModule {}
