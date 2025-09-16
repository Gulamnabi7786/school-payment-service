import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../orders/schemas/order.schema';
import { OrderStatus } from '../order-status/schemas/order-status.schema';

@Injectable()
export class WebhooksService {
  private readonly logger = new Logger(WebhooksService.name);

  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(OrderStatus.name) private readonly orderStatusModel: Model<OrderStatus>,
  ) {}

  /**
   * Handle incoming webhook payload
   */
  async handleWebhook(payload: any): Promise<any> {
    try {
      this.logger.debug('Received webhook payload', JSON.stringify(payload));

      // 1️⃣ Extract order info
      const orderInfo = payload.order_info;
      if (!orderInfo || !orderInfo.order_id) {
        throw new HttpException('Invalid payload: order_info missing', HttpStatus.BAD_REQUEST);
      }

      // 2️⃣ Find related Order
      const order = await this.orderModel.findById(orderInfo.order_id);
      if (!order) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }

      // 3️⃣ Update OrderStatus document
      await this.orderStatusModel.findOneAndUpdate(
        { collect_id: order._id.toString() },
        {
          order_amount: orderInfo.order_amount,
          transaction_amount: orderInfo.transaction_amount,
          payment_mode: orderInfo.payment_mode,
          payment_details: orderInfo.payment_details,
          bank_reference: orderInfo.bank_reference,
          payment_message: orderInfo.payment_message,
          status: orderInfo.status,
          error_message: orderInfo.error_message,
          payment_time: orderInfo.payment_time,
        },
        { upsert: true, new: true },
      );

      return { success: true, message: 'Webhook processed successfully' };
    } catch (error) {
      this.logger.error('Error processing webhook', error);
      throw new HttpException(
        error.response?.data || error.message || 'Webhook processing failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
