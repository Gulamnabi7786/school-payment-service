import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebhooksService } from './webhooks.service';
import { WebhooksController } from './webhooks.controller';
import { WebhookLog, WebhookLogSchema } from './schemas/webhook-log.schema';
import { WebhookLogService } from './webhook-log.service';
import { Order, OrderSchema } from '../orders/schemas/order.schema';
import { OrderStatus, OrderStatusSchema } from '../order-status/schemas/order-status.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WebhookLog.name, schema: WebhookLogSchema },
      { name: Order.name, schema: OrderSchema },
      { name: OrderStatus.name, schema: OrderStatusSchema },
    ]),
  ],
  controllers: [WebhooksController],
  providers: [WebhooksService, WebhookLogService],
  exports: [WebhookLogService],
})
export class WebhooksModule {}
