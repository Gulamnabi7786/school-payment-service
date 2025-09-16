import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { OrderStatus, OrderStatusDocument } from './schemas/order-status.schema';

@Injectable()
export class OrderStatusService {
  constructor(@InjectModel(OrderStatus.name) private model: Model<OrderStatusDocument>) {}

  async create(data: Partial<OrderStatus>): Promise<OrderStatusDocument> {
    // Cast collect_id string → ObjectId
    const toSave = {
      ...data,
      collect_id: new Types.ObjectId(data.collect_id as any),
    };
    const created = new this.model(toSave);
    return created.save();
  }

  async updateByOrderId(orderId: string, updateData: Partial<OrderStatus>) {
    return this.model
      .findOneAndUpdate(
        { collect_id: new Types.ObjectId(orderId) },
        updateData,
        { new: true, upsert: true },
      )
      .exec();
  }
}
