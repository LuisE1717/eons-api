import { Module } from '@nestjs/common';
import { LanzamientosController } from './lanzamientos.controller';
import { LanzamientosService } from './lanzamientos.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [LanzamientosController],
  providers: [LanzamientosService],
  imports: [PrismaModule],
  exports: [LanzamientosService],
})
export class LanzamientosModule {}
