// import { Module } from '@nestjs/common';
// import { OrderStatusController } from './order-status.controller';
// import { OrderStatusService } from './order-status.service';

// @Module({
//   controllers: [OrderStatusController],
//   providers: [OrderStatusService]
// })
// export class OrderStatusModule {}


















import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderStatus, OrderStatusSchema } from './schemas/order-status.schema';
import { OrderStatusService } from './order-status.service';
import { OrderStatusController } from './order-status.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrderStatus.name, schema: OrderStatusSchema }]),
  ],
  providers: [OrderStatusService],
  controllers: [OrderStatusController],
  exports: [OrderStatusService],
})
export class OrderStatusModule {}
