import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  school_id: string;

  @Prop()
  trustee_id?: string;

  @Prop({
    type: {
      name: { type: String, required: true },
      id: { type: String, required: true },
      email: { type: String, required: true },
    },
  })
  student_info: { name: string; id: string; email: string };

  @Prop()
  gateway_name?: string;

  @Prop({ index: true })
  collect_request_id?: string; // external payment id
}

export const OrderSchema = SchemaFactory.createForClass(Order);
