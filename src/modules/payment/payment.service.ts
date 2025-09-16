import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import { OrdersService } from '../orders/orders.service';
import { OrderStatusService } from '../order-status/order-status.service';
import { OrderDocument } from '../orders/schemas/order.schema';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);
  private baseUrl: string;
  private apiKey: string;
  private pgKey: string;

  constructor(
    private config: ConfigService,
    private ordersService: OrdersService,
    private orderStatusService: OrderStatusService,
  ) {
    this.baseUrl = this.config.get<string>('PAYMENT_BASE_URL')!;
    this.apiKey = this.config.get<string>('PAYMENT_API_KEY')!;
    this.pgKey = this.config.get<string>('PG_KEY')!;
  }

  /**
   * Create collect request: signs payload, calls external API, saves DB records.
   */
  async createCollect(payload: { school_id: string; amount: string; callback_url: string; custom_order_id?: string }) {
    const { school_id, amount, callback_url, custom_order_id } = payload;

    if (!this.pgKey || !this.apiKey) {
      throw new BadRequestException('Payment gateway keys not configured');
    }

    // 1) Build sign (JWT) using PG_KEY
    const signPayload = { school_id, amount, callback_url };
    const sign = jwt.sign(signPayload, this.pgKey);

    // 2) Prepare request body
    const body = { school_id, amount, callback_url, sign };

    // 3) Save a preliminary order in DB
    const orderDoc: OrderDocument = await this.ordersService.create({
      school_id,
      trustee_id: undefined,
      student_info: { name: '', id: '', email: '' },
      gateway_name: 'Edviron',
      collect_request_id: undefined,
    });

    try {
      // 4) Call external API
      const url = `${this.baseUrl}/create-collect-request`;
      const res = await axios.post(url, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        timeout: 10000,
      });

      const data = res.data;

      // 5) Map external ID to local order
      await this.ordersService.update(orderDoc._id.toHexString(), {
        collect_request_id: data.collect_request_id,
      });

      // 6) Create initial OrderStatus entry
      await this.orderStatusService.create({
        collect_id: orderDoc._id.toHexString(),
        order_amount: Number(amount),
        transaction_amount: undefined,
        payment_mode: undefined,
        payment_details: undefined,
        bank_reference: undefined,
        payment_message: undefined,
        status: 'PENDING',
        error_message: undefined,
        payment_time: undefined,
      });

      // 7) Return response
      return {
        collect_request_id: data.collect_request_id,
        collect_request_url:
          data.Collect_request_url || data.collect_request_url || data.url,
        sign: data.sign || sign,
      };
    } catch (err: any) {
      this.logger.error('createCollect call failed', err?.response?.data ?? err.message);
      try {
        await this.ordersService.delete(orderDoc._id.toHexString());
      } catch (e) {
        this.logger.warn('Failed to rollback order after error');
      }
      throw new BadRequestException('Failed to create collect request with payment gateway');
    }
  }

  /**
   * Check payment status by calling the gateway GET endpoint.
   */
  async checkCollectStatus(collect_request_id: string, school_id?: string) {
    const schoolId = school_id ?? this.config.get<string>('SCHOOL_ID');
    if (!schoolId) throw new BadRequestException('school_id is required');

    // sign payload for status check
    const sign = jwt.sign({ school_id: schoolId, collect_request_id }, this.pgKey);

    const url = `${this.baseUrl}/collect-request/${collect_request_id}?school_id=${encodeURIComponent(
      schoolId,
    )}&sign=${encodeURIComponent(sign)}`;

    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });

    const data = res.data;

    // Update DB
    const order = await this.ordersService.findByCollectRequestId(collect_request_id);
    if (order) {
      await this.orderStatusService.updateByOrderId(order._id.toHexString(), {
        status: data.status || 'UNKNOWN',
        transaction_amount: data.amount ?? undefined,
        payment_time: new Date(),
      });
    }

    return data;
  }
}
