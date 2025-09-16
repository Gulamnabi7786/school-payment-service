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
import { OrdersService } from './orders.service';
import { Order, OrderSchema } from './schemas/order.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])],
  providers: [OrdersService],
  exports: [OrdersService],   // ✅ export it so other modules can use
})
export class OrdersModule {}
