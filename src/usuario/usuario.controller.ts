import { Controller, Get, Query } from '@nestjs/common';
import { UsuariosService } from './usuario.service';
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}
  @Get('is-verified')
  async isVerified(@Query('email') email: string) {
    const user = await this.usuariosService.findOneByEmail(email);
    return { verified: user?.isEmailVerified ?? false };
  }
  // @Get()
  // async getAllUsuarios() {
  //   return this.usuariosService.getAllUsuarios();
  // }
  // @Post()
  // async createUsuario(@Body() data: CreateUsuarioDto) {
  //   return this.usuariosService.createUsuario(data);
  // }
  // @Get(':id')
  // async getUsuarioById(@Param('id') id: string) {
  //   const usuarioFound = await this.usuariosService.getUsuarioById(id);
  //   if (!usuarioFound) throw new NotFoundException('No existe el Usuario');
  //   return usuarioFound;
  // }
  // @Delete(':id')
  // async deleteUsuario(@Param('id') id: string) {
  //   try {
  //     return await this.usuariosService.deleteUsuario(id);
  //   } catch (error) {
  //     throw new NotFoundException('No existe el Usuario');
  //   }
  // }
  // @Put(':id')
  // async updateUsuario(@Param('id') id: string, @Body() data: UpdateUsuarioDto) {
  //   try {
  //     return await this.usuariosService.updateUsuario(data, id);
  //   } catch (error) {
  //     throw new BadRequestException(error);
  //   }
  // }
}
