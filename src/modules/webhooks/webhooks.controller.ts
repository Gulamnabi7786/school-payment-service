import { Controller, Post, Body, Logger } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';

@Controller('webhook')
export class WebhooksController {
  private readonly logger = new Logger(WebhooksController.name);

  constructor(private readonly webhooksService: WebhooksService) {}

  @Post()
  async handle(@Body() payload: any) {
    this.logger.log('Received webhook', JSON.stringify(payload));
    // store webhook log, update order status
    return this.webhooksService.processWebhook(payload);
  }
}
