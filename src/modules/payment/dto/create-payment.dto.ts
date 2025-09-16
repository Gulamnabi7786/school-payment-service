import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  school_id: string;

  @IsNotEmpty()
  @IsString()
  amount: string; // per doc amount as string (INR)

  @IsNotEmpty()
  @IsString()
  callback_url: string;

  @IsOptional()
  @IsString()
  // optional student/order info to store in DB
  custom_order_id?: string;
}
