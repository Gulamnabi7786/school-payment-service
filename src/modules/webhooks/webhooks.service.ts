import { Injectable, Logger } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { OrderStatusService } from '../order-status/order-status.service';
import { WebhookLogService } from './webhook-log.service';

@Injectable()
export class WebhooksService {
  private readonly logger = new Logger(WebhooksService.name);

  constructor(
    private ordersService: OrdersService,
    private orderStatusService: OrderStatusService,
    private webhookLogService: WebhookLogService,
  ) {}

  async processWebhook(payload: any) {
    await this.webhookLogService.create(payload);

    const info = payload?.order_info;
    if (!info) return { ok: false, reason: 'missing order_info' };

    // extract collect_request_id
    const rawOrderId = info.order_id;
    const collect_request_id = rawOrderId ? rawOrderId.split('/')[0] : null;

    if (!collect_request_id) {
      this.logger.warn('Webhook missing collect_request_id');
      return { ok: false, reason: 'missing collect_request_id' };
    }

    const order = await this.ordersService.findByCollectRequestId(collect_request_id);
    if (!order) {
      this.logger.warn(`Order not found for collect_request_id=${collect_request_id}`);
      return { ok: false, reason: 'order_not_found' };
    }

    await this.orderStatusService.updateByOrderId(order._id.toHexString(), {
      order_amount: info.order_amount,
      transaction_amount: info.transaction_amount,
      payment_mode: info.payment_mode,
      payment_details: info.payemnt_details || info.payment_details,
      bank_reference: info.bank_reference,
      payment_message: info.Payment_message || info.payment_message,
      status: info.status,
      error_message: info.error_message,
      payment_time: info.payment_time ? new Date(info.payment_time) : new Date(),
    });

    return { ok: true };
  }
}
