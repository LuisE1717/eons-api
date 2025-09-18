import {
  Controller,
  Param,
  Post,
  Body,
  UseGuards,
  Request,
  BadRequestException,
  Query,
  Logger,
} from '@nestjs/common';
import { TropiPayService } from './tropipay.service';
import { TropiPayV3Service } from './tropipay-v3.service'; // ✅ Nuevo servicio
import { EsenciasService } from 'src/esencia/esencia.service';
import { sha256 } from 'js-sha256';
import { UsuariosService } from 'src/usuario/usuario.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JWTUser } from 'src/lib/jwt';
import { AccessGuard } from 'src/auth/auth.guard';
import { PaymentOperation } from './dto/paymentCheck';

@Controller('tropipay')
export class TropiPayController {
  private readonly logger = new Logger(TropiPayController.name);

  constructor(
    private readonly tropiPayService: TropiPayService,
    private readonly tropiPayV3Service: TropiPayV3Service,
    private readonly esenciaService: EsenciasService,
    private readonly usuarioService: UsuariosService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('create-payment-card/:id')
  @UseGuards(AccessGuard)
  async createPaymentCard(
    @Param('id') id: string,
    @Request() req: { user: JWTUser },
    @Query() { lang }: { lang: string },
  ) {
    try {
      this.logger.log(`Creating payment for esencia ID: ${id}, user: ${req.user.id}`);
      
      const date = new Date();
      const formattedDateTime = date.toISOString(); // ✅ Usar formato ISO para la fecha
      
      const user = await this.usuarioService.getUsuarioById(req.user.id);
      const esencia = await this.esenciaService.getEsenciaById(Number(id));
      
      this.logger.log(`User: ${user.email}, Esencia: ${esencia.descripcion}, Price: ${esencia.precio}`);
      
      // ✅ PAYLOAD EN CAMELCASE (TropiPay v3 lo espera así)
      const payload = {
        reference: user.email,
        concept: 'Compra de Esencia',
        description: esencia.descripcion,
        amount: Math.round(Number(esencia.precio) * 100),
        currency: 'EUR',
        singleUse: true, // ← camelCase
        reasonId: 4, // ← camelCase
        expirationDays: 1, // ← camelCase
        favorite: true, // ← Agregar este campo que pide TropiPay
        lang: lang || 'es',
        successUrl: 'https://www.eons.es/payment', // ← camelCase
        failUrl: 'https://www.eons.es/payment/failed', // ← camelCase
        notificationUrl: 'https://eons-services.onrender.com/tropipay/', // ← camelCase
        serviceDate: formattedDateTime, // ← camelCase + formato ISO
        directPayment: true, // ← camelCase
        paymentMethods: ['EXT', 'TPP'], // ← camelCase
      };

      this.logger.log('Sending payload to TropiPay:', JSON.stringify(payload, null, 2));
      
      const result = await this.tropiPayV3Service.createPaymentLink(payload);
      this.logger.log('Payment link created successfully');
      
      return result;
      
    } catch (error) {
      this.logger.error('Payment creation failed:', error.message, error.stack);
      
      if (error.message.includes('limit exceded') || error.message.includes('limit exceeded')) {
        throw new BadRequestException('Límite excedido');
      }
      if (error.message.includes('authentication') || error.message.includes('credentials')) {
        throw new BadRequestException('Error de autenticación con TropiPay');
      }
      
      throw new BadRequestException('Error al crear el pago: ' + error.message);
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
      const formattedDateTime = date.toISOString(); // ✅ Formato ISO
      
      const user = await this.usuarioService.getUsuarioById(req.user.id);
      
      // ✅ PAYLOAD EN CAMELCASE
      const payload = {
        reference: user.email,
        concept: 'Esencia',
        description: `${datah.esencia} de Esencia`,
        amount: datah.precio * 100,
        currency: 'EUR',
        singleUse: true, // ← camelCase
        reasonId: 4, // ← camelCase
        expirationDays: 1, // ← camelCase
        favorite: true, // ← Agregar este campo
        lang: 'es',
        successUrl: 'https://www.eons.es/payment', // ← camelCase
        failUrl: 'https://www.eons.es/payment/failed', // ← camelCase
        notificationUrl: 'https://webhook.site/c43d202f-2571-4a6c-af46-e2a3ca539851',
        serviceDate: formattedDateTime, // ← camelCase + formato ISO
        directPayment: true, // ← camelCase
        paymentMethods: ['EXT', 'TPP'], // ← camelCase
      };

      const result = await this.tropiPayV3Service.createPaymentLink(payload);
      return result;
      
    } catch (error) {
      console.log('Custom payment creation error:', error);
      if (error.message.includes('limit exceded') || error.message.includes('limit exceeded')) {
        throw new BadRequestException('limit exceded');
      }
      throw new BadRequestException('Error creating custom payment: ' + error.message);
    }
  }

  @Post()
  async validateSignature(@Body() data: any) {
    try {
      // ⚠️ IMPORTANTE: La respuesta de TropiPay v3 puede venir en camelCase
      console.log('Datos recibidos de TropiPay:', JSON.stringify(data, null, 2));
      
      // Prueba con ambos formatos (camelCase y snake_case)
      const bankOrderCode = data.data?.bankOrderCode || data.data?.bank_order_code;
      const amount = data.data?.amount || data.data?.originalCurrencyAmount;
      const signature = data.data?.signature || data.data?.signaturev2;
      
      if (!bankOrderCode || !amount || !signature) {
        throw new BadRequestException('Datos de pago incompletos');
      }
      
      const clientId = process.env.TROPIPAY_CLIENT_ID;
      const clientSecret = process.env.TROPIPAY_CLIENT_SECRET;

      // ✅ Firma actualizada
      const messageToSign = `${bankOrderCode}${clientId}${clientSecret}${amount}`;
      const expectedSignature = sha256(messageToSign);

      if (expectedSignature === signature) {
        let epay = 0;
        
        if (amount === 499) epay = 5;
        else if (amount === 1440) epay = 15;
        else if (amount === 2350) epay = 25;
        else if (amount === 4599) epay = 50;
        else if (amount === 8999) epay = 100;
        else if (amount === 21250) epay = 250;
        else if (amount === 71999) epay = 1000;
        else if (amount === 174999) epay = 2500;
        else {
          const match = data.data.description?.match(/\d+/);
          epay = match ? parseInt(match[0], 10) : 0;
        }

        const user = await this.usuarioService.findOneByEmail(data.data.reference);
        user.esencia = user.esencia + epay;
        await this.usuarioService.updateUsuario(user, user.id);
        
        return this.prisma.compra.create({
          data: {
            email: data.data.reference,
            bank_order: bankOrderCode,
          },
        });
      } else {
        console.log('Firma no válida');
        throw new BadRequestException('Invalid signature');
      }
    } catch (error) {
      console.log('Validation error:', error);
      throw new BadRequestException('Validation failed: ' + error.message);
    }
  }

  @Post('validate-payment')
  async validatePayment(@Body() data: any) {
    return await this.tropiPayService.validateBankOrder(data);
  }
}
