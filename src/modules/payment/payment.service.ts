import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  private readonly apiUrl = 'https://dev-vanilla.edviron.com/erp';

  constructor(private readonly configService: ConfigService) {
    // Debug log to confirm env variables are loaded
    console.log('ENV CHECK (PaymentService):', {
      SCHOOL_ID: this.configService.get<string>('SCHOOL_ID'),
      PG_KEY: this.configService.get<string>('PG_KEY'),
      PAYEMENT_API_KEY: this.configService.get<string>('PAYMENT_API_KEY'),
    });
  }

  /**
   * Create a new payment (collect request)
   */
  async createPayment(dto: CreatePaymentDto) {
    try {
      const schoolId = this.configService.get<string>('SCHOOL_ID');
      const pgKey = this.configService.get<string>('PG_KEY');
      const apiKey = this.configService.get<string>('PAYMENT_API_KEY');

      if (!schoolId || !pgKey || !apiKey) {
        throw new HttpException(
          'Missing payment configuration (SCHOOL_ID, PG_KEY, PAYMENT_API_KEY)',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      // ✅ include all fields including custom_order_id
      const payload = {
        school_id: dto.school_id || schoolId,
        amount: dto.amount,
        callback_url: dto.callback_url,
        custom_order_id: dto.custom_order_id,
      };

      // JWT sign using PG_KEY
      const sign = jwt.sign(payload, pgKey as string);

      // Body to send to Edviron PG API
      const body = {
        ...payload,
        sign,
      };

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      };

      // 🔍 Debug logs
      console.log('>>> Sending to Edviron PG:', body);

      const response = await axios.post(
        `${this.apiUrl}/create-collect-request`,
        body,
        { headers },
      );

      console.log('>>> PG Response:', response.data);

      return response.data;
    } catch (error) {
      const err = error as any;
      throw new HttpException(
        err?.response?.data || err?.message || 'Payment creation failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Check payment status
   */
  async checkPaymentStatus(collectRequestId: string) {
    try {
      const schoolId = this.configService.get<string>('SCHOOL_ID');
      const pgKey = this.configService.get<string>('PG_KEY');

      if (!schoolId || !pgKey) {
        throw new HttpException(
          'Missing payment configuration (SCHOOL_ID, PG_KEY)',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const payload = {
        school_id: schoolId,
        collect_request_id: collectRequestId,
      };

      const sign = jwt.sign(payload, pgKey as string);

      const response = await axios.get(
        `${this.apiUrl}/collect-request/${collectRequestId}?school_id=${schoolId}&sign=${sign}`,
      );

      return response.data;
    } catch (error) {
      const err = error as any;
      throw new HttpException(
        err?.response?.data || err?.message || 'Failed to check status',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
