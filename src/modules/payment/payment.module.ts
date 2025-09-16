import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { OrdersModule } from '../orders/orders.module';
import { OrderStatusModule } from '../order-status/order-status.module';
import { WebhooksModule } from '../webhooks/webhooks.module';

@Module({
  imports: [ConfigModule, OrdersModule, OrderStatusModule, WebhooksModule],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
