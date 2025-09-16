import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // POST /payment/create-payment
  @Post('create-payment')
  async createPayment(@Body() dto: CreatePaymentDto) {
    return this.paymentService.createCollect(dto);
  }

  // GET /payment/check-status/:collect_request_id?school_id=...
  @Get('check-status/:collect_request_id')
  async checkStatus(@Param('collect_request_id') id: string, @Query('school_id') school_id?: string) {
    return this.paymentService.checkCollectStatus(id, school_id);
  }
}
