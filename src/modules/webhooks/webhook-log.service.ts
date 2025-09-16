import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WebhookLog, WebhookLogDocument } from './schemas/webhook-log.schema';

@Injectable()
export class WebhookLogService {
  constructor(
    @InjectModel(WebhookLog.name) private webhookLogModel: Model<WebhookLogDocument>,
  ) {}

  async createLog(payload: any): Promise<WebhookLog> {
    const log = new this.webhookLogModel({
      payload,
      receivedAt: new Date(),
    });
    return log.save();
  }
}
