import {
  Controller,
  Param,
  Post,
  Body,
  UseGuards,
  Request,
  BadRequestException,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { TropiPayService } from './tropipay.service';
import { EsenciasService } from 'src/esencia/esencia.service';
import { sha256 } from 'js-sha256';
import { UsuariosService } from 'src/usuario/usuario.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JWTUser } from 'src/lib/jwt';
import { AccessGuard } from 'src/auth/auth.guard';
import { Tropipay } from '@yosle/tropipayjs';
// import { ServerMode$1 } from './type/type';
import { PaymentOperation } from './dto/paymentCheck';

@Controller('tropipay')
export class TropiPayController {
  constructor(
    private readonly tropiPayService: TropiPayService,
    private readonly esenciaService: EsenciasService,
    private readonly usuarioService: UsuariosService,
    private readonly prisma: PrismaService,
  ) {
    this.tpp.hooks.subscribe({
      eventType: 'transaction_completed',
      target: 'web',
      value: 'https://apidev.eons.es/tropipay/tcompleted',
    });
    this.tpp.hooks.subscribe({
      eventType: 'transaction_charged',
      target: 'web',
      value: 'https://apidev.eons.es/tropipay/tcharged',
    });
  }
  config = {
    clientId: process.env.TROPIPAY_CLIENT_ID,
    clientSecret: process.env.TROPIPAY_CLIENT_SECRET,
    scopes: [
      'ALLOW_GET_PROFILE_DATA',
      'ALLOW_PAYMENT_IN',
      'ALLOW_EXTERNAL_CHARGE',
      'KYC3_FULL_ALLOW',
      'ALLOW_GET_BALANCE',
      'ALLOW_GET_MOVEMENT_LIST',
    ],
    // serverMode: 'Production' as ServerMode$1,
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
      console.log('UserId:', req.user.id);
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
      console.log(payload);
      const payment = {
        reference: ref,
        concept: 'de Esencia',
        favorite: true,
        description: payload.descripcion,
        amount: payload.precio,
        currency: 'EUR',
        singleUse: true,
        reasonId: 4,
        expirationDays: 1,
        lang: lang || 'en',
        urlSuccess: 'https://dev.eons.es/payment',
        urlFailed: 'https://dev.eons.es/payment/failed',
        urlNotification: 'https://apidev.eons.es/tropipay',
        serviceDate: formattedDateTime,
        client: null,
        directPayment: true,
        paymentMethods: ['EXT', 'TPP'],
      };
      console.log(JSON.stringify(payment, null, 2));
      return await this.tpp.paymentCards.create(payment);
    } catch (error) {
      console.log(error);
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
    console.log('UserId:', req.user.id);
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
      console.log('Paymentcard data:', datah);
      const ref = (await this.usuarioService.getUsuarioById(req.user.id)).email;
      const payload = {
        descripcion: `${datah.esencia} de Esencia`,

        precio: datah.precio * 100,
      };
      return await this.tpp.paymentCards.create({
        reference: ref,
        concept: 'Esencia',
        favorite: true,
        description: payload.descripcion,
        amount: payload.precio,
        currency: 'EUR',
        singleUse: true,
        reasonId: 4,
        expirationDays: 1,
        lang: 'es',
        urlSuccess: 'https://dev.eons.es/payment',
        urlFailed: 'https://dev.eons.es/payment/failed',
        urlNotification: 'https://apidev.eons.es/tropipay',
        //'https://eons-services.onrender.com/tropipay/',
        serviceDate: formattedDateTime,
        client: null,
        directPayment: true,
        paymentMethods: ['EXT', 'TPP'],
      });
    } catch (error) {
      console.log(error);
      if (error?.error?.message == 'Card credit cashin limit exceded')
        throw new BadRequestException('limit exceded');
    }
  }

  @Post()
  async validateSignature(@Body() data) {
    try {
      console.log(JSON.stringify(data, null, 2));
      const { bankOrderCode, originalCurrencyAmount, signaturev2 } = data.data;
      console.log(signaturev2);
      const clientId = process.env.TROPIPAY_CLIENT_ID;
      const clientSecret = process.env.TROPIPAY_CLIENT_SECRET;

      const messageToSign = `${bankOrderCode}${clientId}${clientSecret}${originalCurrencyAmount}`;

      const expectedSignature = sha256(messageToSign);
      if (expectedSignature !== signaturev2) {
        throw new Error('Invalid signature');
      }
      const amountToEpayMap = new Map<number, number>([
        [499, 5],
        [1440, 15],
        [2350, 25],
        [4599, 50],
        [8999, 100],
        [21250, 250],
        [71999, 1000],
        [174999, 2500],
      ]);

      const amount = data.data.paymentcard.amount;
      let epay = amountToEpayMap.get(amount) || 0;

      // Si no coincide con los valores predeterminados, trata de extraer el valor de la descripción
      if (epay === 0) {
        const match = data.data.paymentcard.description.match(/\d+/);
        epay = match ? parseInt(match[0], 10) : 0;
      }

      const user = await this.usuarioService.findOneByEmail(
        data.data.reference,
      );

      if (!user) {
        throw new Error('User not found');
      }
      const updatedEsencia = user.esencia + epay;
      const compra = await this.prisma.compra.create({
        data: {
          email: data.data.reference,
          bank_order: data.data.bankOrderCode,
        },
      });

      await this.usuarioService.updateUsuario(
        { ...user, esencia: updatedEsencia },
        user.id,
      );

      return compra;

      // if (expectedSignature === signaturev2) {
      //   let epay = 0;
      //   if (data.data.paymentcard.amount === 499) {
      //     epay = 5;
      //   } else if (data.data.paymentcard.amount === 1440) {
      //     epay = 15;
      //   } else if (data.data.paymentcard.amount === 2350) {
      //     epay = 25;
      //   } else if (data.data.paymentcard.amount === 4599) {
      //     epay = 50;
      //   } else if (data.data.paymentcard.amount === 8999) {
      //     epay = 100;
      //   } else if (data.data.paymentcard.amount === 21250) {
      //     epay = 250;
      //   } else if (data.data.paymentcard.amount === 71999) {
      //     epay = 1000;
      //   } else if (data.data.paymentcard.amount === 174999) {
      //     epay = 2500;
      //   } else {
      //     const match = data.data.paymentcard.description.match(/\d+/);
      //     epay = match ? parseInt(match[0], 10) : null;
      //   }
      //   const user = this.usuarioService.findOneByEmail(data.data.reference);
      //   (await user).esencia = (await user).esencia + epay;
      //   this.usuarioService.updateUsuario(await user, (await user).id);
      //   return this.prisma.compra.create({
      //     data: {
      //       email: data.data.reference,
      //       bank_order: data.data.bankOrderCode,
      //     },
      //   });
      // } else {
      //   console.log('Firma no válida');
      // }
    } catch (error) {
      console.log('Veryfication error', error);
    }
  }

  @Post('validate-payment')
  async validatePayment(@Body() data: any) {
    return await this.tropiPayService.validateBankOrder(data);
  }

  @Post('tcompleted')
  async transferCompletedHook(@Body() data: any, @Res() res: Response) {
    console.log('Hook transaction_completed data:');
    console.log(JSON.stringify(data, null, 2));
    return res.status(200).send('Webhook received successfully');
  }

  @Post('tcharged')
  async transferPaydHook(@Body() data: any, @Res() res: Response) {
    console.log('Hook transaction_charged data:');
    console.log(JSON.stringify(data, null, 2));
    return res.status(200).send('Webhook received successfully');
  }
  @Post('verifycation')
  async verifycation(
    @Body()
    data: {
      signature: string;
      bankOrderCode: string;
      originalCurrencyAmount: string;
    },
    @Res() res: Response,
  ) {
    const clientId = process.env.TROPIPAY_CLIENT_ID;
    const clientSecret = process.env.TROPIPAY_CLIENT_SECRET;
    const { signature, bankOrderCode, originalCurrencyAmount } = data;

    const messageToSign = `${bankOrderCode}${clientId}${clientSecret}${originalCurrencyAmount}`;

    const expectedSignature = sha256(messageToSign);

    console.log(expectedSignature === signature);
    console.log('Espected:', expectedSignature);
    console.log('Signature:', signature);

    return res.status(200).send('Webhook received successfully');
  }
}
