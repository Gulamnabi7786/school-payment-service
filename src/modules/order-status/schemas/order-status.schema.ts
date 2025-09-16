// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';
// import * as mongoose from 'mongoose';
// import { Order } from '../../orders/schemas/order.schema';

// export type OrderStatusDocument = OrderStatus & Document;

// @Schema({ timestamps: true })
// export class OrderStatus {
//   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order', index: true })
//   collect_id: mongoose.Types.ObjectId;

//   @Prop()
//   order_amount?: number;

//   @Prop()
//   transaction_amount?: number;

//   @Prop()
//   payment_mode?: string;

//   @Prop()
//   payment_details?: string;

//   @Prop()
//   bank_reference?: string;

//   @Prop()
//   payment_message?: string;

//   @Prop()
//   status?: string;

//   @Prop()
//   error_message?: string;

//   @Prop()
//   payment_time?: Date;
// }

// export const OrderStatusSchema = SchemaFactory.createForClass(OrderStatus);











// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, Types } from 'mongoose';

// export type OrderStatusDocument = OrderStatus & Document & { _id: Types.ObjectId };

// @Schema({ timestamps: true })
// export class OrderStatus {
//   @Prop({ type: Types.ObjectId, ref: 'Order', required: true })
//   collect_id: string;

//   @Prop({ required: true })
//   order_amount: number;

//   @Prop()
//   transaction_amount?: number;

//   @Prop()
//   payment_mode?: string;

//   @Prop()
//   payment_details?: string;

//   @Prop()
//   bank_reference?: string;

//   @Prop()
//   payment_message?: string;

//   @Prop()
//   status?: string;

//   @Prop()
//   error_message?: string;

//   @Prop()
//   payment_time?: Date;
// }

// export const OrderStatusSchema = SchemaFactory.createForClass(OrderStatus);














import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderStatusDocument = OrderStatus & Document;

@Schema({ timestamps: true })
export class OrderStatus {
  @Prop({ type: Types.ObjectId, ref: 'Order', required: true })
  collect_id: Types.ObjectId;

  @Prop() order_amount: number;
  @Prop() transaction_amount?: number;
  @Prop() payment_mode?: string;
  @Prop() payment_details?: string;
  @Prop() bank_reference?: string;
  @Prop() payment_message?: string;
  @Prop() status: string;
  @Prop() error_message?: string;
  @Prop() payment_time?: Date;
}

export const OrderStatusSchema = SchemaFactory.createForClass(OrderStatus);
