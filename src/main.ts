import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import * as dotenv from 'dotenv';

// load the environment variables from the .env file
dotenv.config();

// bootstrap the application
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(), // use fastify instead of express for better performance
  );

  app.useGlobalPipes(
    new ValidationPipe({
      // automatically transform payloads to DTO instances
      transform: true,
      // automatically strip out non-whitelisted properties
      whitelist: true,
    }),
  );

  app.enableCors({
    origin: '*', //TODO: change this to the actual origin
  });

  await app.listen(3000);
}
bootstrap();
