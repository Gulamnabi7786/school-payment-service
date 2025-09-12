// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class OrdersService {}










import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  async create(orderData: any): Promise<Order> {
    const order = new this.orderModel(orderData);
    return order.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }
}
