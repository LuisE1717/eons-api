import {
  Controller,
  Param,
  Post,
  Body,
  UseGuards,
  Request,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { TropiPayService } from './tropipay.service';
import { EsenciasService } from 'src/esencia/esencia.service';
import { sha256 } from 'js-sha256';
import { UsuariosService } from 'src/usuario/usuario.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JWTUser } from 'src/lib/jwt';
import { AccessGuard } from 'src/auth/auth.guard';
import { Tropipay } from '@yosle/tropipayjs';
import { ServerMode$1 } from './type/type';
import { PaymentOperation } from './dto/paymentCheck';

@Controller('tropipay')
export class TropiPayController {
  constructor(
    private readonly tropiPayService: TropiPayService,
    private readonly esenciaService: EsenciasService,
    private readonly usuarioService: UsuariosService,
    private readonly prisma: PrismaService,
  ) {}

  // Configuración actualizada para API v3
  config = {
    clientId: process.env.TROPIPAY_CLIENT_ID,
    clientSecret: process.env.TROPIPAY_CLIENT_SECRET,
    baseUrl: 'https://www.tropipay.com', 
    apiVersion: 'v3',
    scopes: [
      'ALLOW_GET_PROFILE_DATA',
      'ALLOW_PAYMENT_IN',
      'ALLOW_EXTERNAL_CHARGE',
      'KYC3_FULL_ALLOW',
      'ALLOW_GET_BALANCE',
      'ALLOW_GET_MOVEMENT_LIST',
    ],
    serverMode: 'Production' as ServerMode$1,
  };
  tpp = new Tropipay(this.config);

  @Post('create-payment-card/:id')
  @UseGuards(AccessGuard)
  async createPaymentCard(
    @Param('id') id: string,
    @Request() req: { user: JWTUser },
    @Query() { lang }: { lang: string },
  ) {
    try {
      const date = new Date();
      const formattedDateTime = date.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      const ref = (await this.usuarioService.getUsuarioById(req.user.id)).email;
      const esencia = await this.esenciaService.getEsenciaById(Number(id));
      const payload = {
        descripcion: esencia.descripcion,
        precio: Number(esencia.precio) * 100,
      };
      
      // Payload actualizado para API v3
      return await this.tpp.paymentCards.create({
        reference: ref,
        concept: 'de Esencia',
        description: payload.descripcion,
        amount: payload.precio,
        currency: 'EUR',
        single_use: true, // Cambiado a snake_case para v3
        reason_id: 4, // Cambiado a snake_case para v3
        expiration_days: 1, // Cambiado a snake_case para v3
        lang: lang || 'en',
        success_url: 'https://www.eons.es/payment', // Cambiado para v3
        fail_url: 'https://www.eons.es/payment/failed', // Cambiado para v3
        notification_url: 'https://eons-services.onrender.com/tropipay/', // Cambiado para v3
        service_date: formattedDateTime, // Cambiado a snake_case para v3
        direct_payment: true, // Cambiado a snake_case para v3
        payment_methods: ['EXT', 'TPP'], // Cambiado a snake_case para v3
        // Eliminado 'favorite' y 'client' si no son compatibles con v3
      });
    } catch (error) {
      console.log(error)
      if (error?.error?.message == 'Card credit cashin limit exceded')
        throw new BadRequestException('limit exceded');
    }
  }

  @Post('create-payment-card')
  @UseGuards(AccessGuard)
  async createPaymentCustomCard(
    @Body() datah: PaymentOperation,
    @Request() req: { user: JWTUser },
  ) {
    try {
      const date = new Date();
      const formattedDateTime = date.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      const ref = (await this.usuarioService.getUsuarioById(req.user.id)).email;
      const payload = {
        descripcion: `${datah.esencia} de Esencia`,
        precio: datah.precio * 100,
      };

      // Payload actualizado para API v3
      return await this.tpp.paymentCards.create({
        reference: ref,
        concept: 'Esencia',
        description: payload.descripcion,
        amount: payload.precio,
        currency: 'EUR',
        single_use: true,
        reason_id: 4,
        expiration_days: 1,
        lang: 'es',
        success_url: 'https://www.eons.es/payment',
        fail_url: 'https://www.eons.es/payment/failed',
        notification_url:
          'https://webhook.site/c43d202f-2571-4a6c-af46-e2a3ca539851',
        service_date: formattedDateTime,
        direct_payment: true,
        payment_methods: ['EXT', 'TPP'],
      });
    } catch (error) {
      if (error?.error?.message == 'Card credit cashin limit exceded')
        throw new BadRequestException('limit exceded');
    }
  }

  @Post()
  async validateSignature(@Body() data) {
    // Lógica de validación actualizada para v3
    const { bank_order_code, amount, signature } = data.data; // Campos actualizados para v3
    
    const clientId = process.env.TROPIPAY_CLIENT_ID;
    const clientSecret = process.env.TROPIPAY_CLIENT_SECRET;

    // Firma actualizada para v3
    const messageToSign = `${bank_order_code}${clientId}${clientSecret}${amount}`;
    const expectedSignature = sha256(messageToSign);

    if (expectedSignature === signature) {
      let epay = 0;
      const paymentAmount = data.data.amount; // Campo actualizado
      
      if (paymentAmount === 499) {
        epay = 5;
      } else if (paymentAmount === 1440) {
        epay = 15;
      } else if (paymentAmount === 2350) {
        epay = 25;
      } else if (paymentAmount === 4599) {
        epay = 50;
      } else if (paymentAmount === 8999) {
        epay = 100;
      } else if (paymentAmount === 21250) {
        epay = 250;
      } else if (paymentAmount === 71999) {
        epay = 1000;
      } else if (paymentAmount === 174999) {
        epay = 2500;
      } else {
        const match = data.data.description.match(/\d+/);
        epay = match ? parseInt(match[0], 10) : null;
      }
      
      const user = this.usuarioService.findOneByEmail(data.data.reference);
      (await user).esencia = (await user).esencia + epay;
      this.usuarioService.updateUsuario(await user, (await user).id);
      
      return this.prisma.compra.create({
        data: {
          email: data.data.reference,
          bank_order: data.data.bank_order_code, // Campo actualizado
        },
      });
    } else {
      console.log('Firma no válida');
    }
  }

  @Post('validate-payment')
  async validatePayment(@Body() data: any) {
    return await this.tropiPayService.validateBankOrder(data);
  }
}
