// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();








// // src/main.ts
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe, Logger } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.useGlobalPipes(new ValidationPipe({
//     whitelist: true,
//     forbidNonWhitelisted: true,
//     transform: true,
//   }));

//   const config = app.get(ConfigService);
//   const port = config.get<number>('PORT') || 3000;

//   await app.listen(port);
//   Logger.log(`App listening on http://localhost:${port}`);
// }
// bootstrap();





























// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ✅ Enable CORS so frontend can talk to backend
  app.enableCors({
    origin: [
      'http://localhost:3000', // local frontend
      'https://edviron-school-payment-frontend.vercel.app', // Vercel frontend
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = app.get(ConfigService);
  const port = config.get<number>('PORT') || 3000;

  await app.listen(port, '0.0.0.0'); // 👈 bind to 0.0.0.0 so Render/hosting works
  Logger.log(`🚀 App listening on http://localhost:${port}`);
}
bootstrap();












// // main.ts
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule, { cors: true });

//   // OR more secure (only allow frontend origin):
//   app.enableCors({
//     origin: 'http://localhost:3001',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//   });

//   await app.listen(3000);
// }
// bootstrap();
