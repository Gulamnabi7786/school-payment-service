import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class WebhookLogService {
  private readonly logger = new Logger(WebhookLogService.name);

  // Save raw webhook logs (right now just logs, later can save to DB)
  async create(data: any): Promise<void> {
    this.logger.debug('WebhookLog: ' + JSON.stringify(data));
  }
}
