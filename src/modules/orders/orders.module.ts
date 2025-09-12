// import { Module } from '@nestjs/common';
// import { OrdersController } from './orders.controller';
// import { OrdersService } from './orders.service';

// @Module({
//   controllers: [OrdersController],
//   providers: [OrdersService]
// })
// export class OrdersModule {}














import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {}
