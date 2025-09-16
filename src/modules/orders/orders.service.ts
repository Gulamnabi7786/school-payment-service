import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrdersService {   // 👈 MUST BE EXPORTED
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  async create(data: Partial<Order>): Promise<OrderDocument> {
    const created = new this.orderModel(data);
    return created.save();
  }

  async update(orderId: string, updateData: Partial<Order>): Promise<OrderDocument | null> {
    return this.orderModel.findByIdAndUpdate(orderId, updateData, { new: true }).exec();
  }

  async delete(orderId: string): Promise<void> {
    await this.orderModel.findByIdAndDelete(orderId).exec();
  }

  async findByCollectRequestId(collect_request_id: string): Promise<OrderDocument | null> {
    return this.orderModel.findOne({ collect_request_id }).exec();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }
}
