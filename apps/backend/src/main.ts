import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

const corsOptions = {
  origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : '*',
  allowedHeaders: '*',
  credentials: true,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: corsOptions,
  });
  app.use(cookieParser());
  await app.listen(3001);
}
bootstrap();
