// import { Controller } from '@nestjs/common';

// @Controller('order-status')
// export class OrderStatusController {}











import { Body, Controller, Post, Put, Param } from '@nestjs/common';
import { Types } from 'mongoose';
import { OrderStatusService } from './order-status.service';
import { CreateOrderStatusDto } from './dto/order-status.dto';

@Controller('order-status')
export class OrderStatusController {
  constructor(private readonly service: OrderStatusService) {}

  @Post()
  async create(@Body() dto: CreateOrderStatusDto) {
    const payload = {
      ...dto,
      collect_id: new Types.ObjectId(dto.collect_id),
    } as any;
    return this.service.create(payload);
  }

  @Put(':orderId')
  async update(@Param('orderId') orderId: string, @Body() update: Partial<CreateOrderStatusDto>) {
    const payload = {
      ...update,
      ...(update && (update as any).collect_id ? { collect_id: new Types.ObjectId((update as any).collect_id) } : {}),
    } as any;
    return this.service.updateByOrderId(orderId, payload);
  }
}
