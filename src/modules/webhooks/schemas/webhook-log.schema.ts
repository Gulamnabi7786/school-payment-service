import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WebhookLogDocument = WebhookLog & Document;

@Schema({ timestamps: true })
export class WebhookLog {
  @Prop({ type: Object, required: true })
  payload: any;

  @Prop()
  receivedAt: Date;
}

export const WebhookLogSchema = SchemaFactory.createForClass(WebhookLog);
