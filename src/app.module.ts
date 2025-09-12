import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';

// import your feature modules
import { OrdersModule } from './modules/orders/orders.module';
import { OrderStatusModule } from './modules/order-status/order-status.module';
import { AuthModule } from './modules/auth/auth.module';
import { WebhooksModule } from './modules/webhooks/webhooks.module';
import { TransactionsModule } from './modules/transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),

    // 👇 THIS establishes DatabaseConnection once for the whole app
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
      }),
    }),

    // 👇 now feature modules can use forFeature
    OrdersModule,
    OrderStatusModule,
    AuthModule,
    WebhooksModule,
    TransactionsModule,
  ],
})
export class AppModule {}



// // src/app.module.ts
// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
// import * as Joi from 'joi';
// import { AuthModule } from './modules/auth/auth.module';
// import { OrdersModule } from './modules/orders/orders.module';
// import { OrderStatusModule } from './modules/order-status/order-status.module';
// import { WebhooksModule } from './modules/webhooks/webhooks.module';
// import { TransactionsModule } from './modules/transactions/transactions.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//       envFilePath: '.env',
//       validationSchema: Joi.object({
//         NODE_ENV: Joi.string().valid('development','production','test').default('development'),
//         PORT: Joi.number().default(3000),
//         MONGO_URI: Joi.string().required(),
//         JWT_SECRET: Joi.string().required(),
//         JWT_EXPIRES_IN: Joi.string().default('3600s'),
//         PAYMENT_API_KEY: Joi.string().required(),
//         PG_KEY: Joi.string().required(),
//         SCHOOL_ID: Joi.string().optional(),
//       }),
//     }),
//     MongooseModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (config: ConfigService) => ({
//         uri: config.get<string>('MONGO_URI'),
//         // options
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       }),
//     }),
//     // feature modules
//     AuthModule,
//     OrdersModule,
//     OrderStatusModule,
//     WebhooksModule,
//     TransactionsModule,
//   ],
// })
// export class AppModule {}