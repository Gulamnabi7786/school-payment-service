import { Module } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { OrdersModule } from '../orders/orders.module';
import { OrderStatusModule } from '../order-status/order-status.module';
import { WebhookLogService } from './webhook-log.service';

@Module({
  imports: [
    OrdersModule,        // ✅ brings OrdersService
    OrderStatusModule,   // ✅ brings OrderStatusService
  ],
  providers: [WebhooksService, WebhookLogService],
  exports: [WebhooksService],
})
export class WebhooksModule {}
