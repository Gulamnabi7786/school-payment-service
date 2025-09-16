import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateOrderStatusDto {
  @IsNotEmpty()
  @IsString()
  collect_id: string; // string from client, will be cast to ObjectId

  @IsNumber()
  order_amount: number;

  @IsOptional()
  @IsNumber()
  transaction_amount?: number;

  @IsOptional()
  @IsString()
  payment_mode?: string;

  @IsOptional()
  @IsString()
  payment_details?: string;

  @IsOptional()
  @IsString()
  bank_reference?: string;

  @IsOptional()
  @IsString()
  payment_message?: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  error_message?: string;

  @IsOptional()
  @IsDateString()
  payment_time?: Date;
}
