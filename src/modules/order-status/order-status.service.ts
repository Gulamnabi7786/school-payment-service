import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderStatus, OrderStatusDocument } from './schemas/order-status.schema';

@Injectable()
export class OrderStatusService {
  constructor(
    @InjectModel(OrderStatus.name) private readonly orderStatusModel: Model<OrderStatusDocument>,
  ) {}

  // Create new status entry
  async create(data: Partial<OrderStatus>): Promise<OrderStatusDocument> {
    const created = new this.orderStatusModel(data);
    return created.save();
  }

  // Update by local order _id
  async updateByOrderId(orderId: string, updateData: Partial<OrderStatus>): Promise<OrderStatusDocument | null> {
    return this.orderStatusModel.findOneAndUpdate(
      { collect_id: orderId },
      updateData,
      { new: true }
    ).exec();
  }

  // Find status by local order _id
  async findByOrderId(orderId: string): Promise<OrderStatusDocument | null> {
    return this.orderStatusModel.findOne({ collect_id: orderId }).exec();
  }

  // Find all
  async findAll(): Promise<OrderStatusDocument[]> {
    return this.orderStatusModel.find().exec();
  }
}
