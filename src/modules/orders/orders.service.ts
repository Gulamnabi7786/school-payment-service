// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class OrdersService {}










// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Order, OrderDocument } from './schemas/order.schema';

// @Injectable()
// export class OrdersService {
//   constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

//   async create(orderData: any): Promise<Order> {
//     const order = new this.orderModel(orderData);
//     return order.save();
//   }

//   async findAll(): Promise<Order[]> {
//     return this.orderModel.find().exec();
//   }
// }





// create(orderData)
// update(orderId, updateData)
// findByCollectRequestId(collect_request_id)
// delete(orderId)






















import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
  ) {}

  // Create a new order
  async create(data: Partial<Order>): Promise<OrderDocument> {
    const created = new this.orderModel(data);
    return created.save();
  }

  // Update by ID
  async update(id: string, updateData: Partial<Order>): Promise<OrderDocument | null> {
    return this.orderModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  // Delete by ID
  async delete(id: string): Promise<OrderDocument | null> {
    return this.orderModel.findByIdAndDelete(id).exec();
  }

  // Find by external collect_request_id
  async findByCollectRequestId(collect_request_id: string): Promise<OrderDocument | null> {
    return this.orderModel.findOne({ collect_request_id }).exec();
  }

  // Find by MongoDB _id
  async findById(id: string): Promise<OrderDocument | null> {
    return this.orderModel.findById(id).exec();
  }

  // Find all orders
  async findAll(): Promise<OrderDocument[]> {
    return this.orderModel.find().exec();
  }
}
