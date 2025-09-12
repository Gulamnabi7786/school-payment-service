// import { Controller } from '@nestjs/common';

// @Controller('orders')
// export class OrdersController {}







// import { Controller, Post, Body, Get } from '@nestjs/common';
// import { OrdersService } from './orders.service';

// @Controller('orders')
// export class OrdersController {
//   constructor(private readonly ordersService: OrdersService) {}

//   @Post()
//   async createOrder(@Body() body: any) {
//     return this.ordersService.create(body);
//   }

//   @Get()
//   async getOrders() {
//     return this.ordersService.findAll();
//   }
// }













import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: any) {
    return this.ordersService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.ordersService.findAll();
  }
}
