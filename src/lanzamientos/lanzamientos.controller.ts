import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
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
    @Body() body: { numLanzamientos: number; coinsPerLaunch: number },
  ) {
    return this.lanzamientosService.realizarSecuenciaLanzamientos(
      req.user.id,
      body.numLanzamientos,
      body.coinsPerLaunch,
    );
  }

  @Post('dialogo-abierto')
  async dialogoAbierto(
    @Request() req,
    @Body() body: { coinPositions: number[][] },
  ) {
    console.log('Request recibida en /dialogo-abierto');
    console.log('User ID:', req.user.id);
    console.log('Coin positions:', body.coinPositions);

    try {
      const result = await this.lanzamientosService.procesarDialogoAbierto(
        req.user.id,
        body.coinPositions,
      );
      console.log('Response enviada:', result);
      return result;
    } catch (error) {
      console.error('Error en controller:', error);
      throw error;
    }
  }

  @Get('historial/:limit?')
  async obtenerHistorial(@Request() req, @Param('limit') limit?: number) {
    return this.lanzamientosService.obtenerHistorialLanzamientos(
      req.user.id,
      limit ? parseInt(limit.toString()) : 10,
    );
  }

  // Nuevo endpoint para obtener resultado específico
  @Get('resultado/:id')
  async obtenerResultado(@Request() req, @Param('id') id: string) {
    return this.lanzamientosService.obtenerResultadoPorId(req.user.id, id);
  }
}
