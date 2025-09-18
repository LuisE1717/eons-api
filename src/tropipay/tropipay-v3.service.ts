import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TropiPayV3Service {
  private accessToken: string;
  private tokenExpiration: Date;
  private readonly logger = new Logger(TropiPayV3Service.name);

  constructor(private readonly httpService: HttpService) {}

  private async authenticate(): Promise<void> {
    try {
      this.logger.log('Authenticating with TropiPay v3...');
      
      const response = await firstValueFrom(
        this.httpService.post(
          'https://www.tropipay.com/api/v3/access/token',
          {
            client_id: process.env.TROPIPAY_CLIENT_ID,
            client_secret: process.env.TROPIPAY_CLIENT_SECRET,
            grant_type: 'client_credentials',
            scope: 'ALLOW_EXTERNAL_CHARGE ALLOW_GET_PROFILE_DATA ALLOW_PAYMENT_IN KYC3_FULL_ALLOW ALLOW_GET_BALANCE ALLOW_GET_MOVEMENT_LIST'
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          }
        )
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiration = new Date(Date.now() + (response.data.expires_in * 1000));
      
      this.logger.log('TropiPay authentication successful');
      
    } catch (error) {
      this.logger.error('TropiPay authentication failed:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          data: error.config?.data
        }
      });
      throw new Error(`Failed to authenticate with TropiPay: ${error.response?.data?.message || error.message}`);
    }
  }

  private async ensureAuthenticated(): Promise<void> {
    if (!this.accessToken || new Date() >= this.tokenExpiration) {
      await this.authenticate();
    }
  }

  async createPaymentLink(payload: any): Promise<any> {
    await this.ensureAuthenticated();

    try {
      this.logger.log('Creating payment link with payload:', JSON.stringify(payload, null, 2));
      
      const response = await firstValueFrom(
        this.httpService.post(
          'https://www.tropipay.com/api/v3/paymentcards',
          payload,
          {
            headers: {
              'Authorization': `Bearer ${this.accessToken}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          }
        )
      );

      this.logger.log('Payment link created successfully');
      return response.data;
      
    } catch (error) {
      this.logger.error('TropiPay payment creation failed:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          data: error.config?.data,
          headers: error.config?.headers
        }
      });
      
      throw new Error(`Failed to create payment link: ${error.response?.data?.message || error.message}`);
    }
  }

  async validateBankOrder(bankOrderCode: string): Promise<any> {
    await this.ensureAuthenticated();

    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `https://www.tropipay.com/api/v3/bankorders/${bankOrderCode}`,
          {
            headers: {
              'Authorization': `Bearer ${this.accessToken}`,
              'Accept': 'application/json',
            },
          }
        )
      );

      return response.data;
    } catch (error) {
      this.logger.error('TropiPay bank order validation error:', error.response?.data);
      throw new Error('Failed to validate bank order');
    }
  }
}
