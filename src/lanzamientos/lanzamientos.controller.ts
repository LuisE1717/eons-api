import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AccessGuard } from 'src/auth/auth.guard';
import { LanzamientosService } from './lanzamientos.service';

@Controller('lanzamientos')
export class LanzamientosController {
  constructor(private readonly lanzamientosService: LanzamientosService) {}

  @Post()
  @UseGuards(AccessGuard)
  async procesarLanzamientos(@Body() data: any, @Request() req: any) {
    return this.lanzamientosService.procesarLanzamientos(data, req.user);
  }
}
