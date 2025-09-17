import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { LanzamientosService } from './lanzamientos.service';
import { AccessGuard } from 'src/auth/auth.guard';

@Controller('lanzamientos')
@UseGuards(AccessGuard)
export class LanzamientosController {
  constructor(private readonly lanzamientosService: LanzamientosService) {}

  @Post('individual/3monedas')
  async lanzamiento3Monedas(@Request() req) {
    return this.lanzamientosService.realizarLanzamiento3Monedas(req.user.id);
  }

  @Post('individual/4monedas')
  async lanzamiento4Monedas(@Request() req) {
    return this.lanzamientosService.realizarLanzamiento4Monedas(req.user.id);
  }

  @Post('secuencia')
  async secuenciaLanzamientos(
    @Request() req,
    @Body() body: { numLanzamientos: number; coinsPerLaunch: number }
  ) {
    return this.lanzamientosService.realizarSecuenciaLanzamientos(
      req.user.id,
      body.numLanzamientos,
      body.coinsPerLaunch
    );
  }

  @Post('dialogo-abierto')
  async dialogoAbierto(
    @Request() req,
    @Body() body: { coinPositions: number[][] }
  ) {
    return this.lanzamientosService.procesarDialogoAbierto(
      req.user.id,
      body.coinPositions
    );
  }

  @Get('historial/:limit?')
  async obtenerHistorial(@Request() req, @Param('limit') limit?: number) {
    return this.lanzamientosService.obtenerHistorialLanzamientos(
      req.user.id,
      limit ? parseInt(limit.toString()) : 10
    );
  }
}
