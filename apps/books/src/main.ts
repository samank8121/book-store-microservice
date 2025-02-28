import { NestFactory } from '@nestjs/core';
import { BooksAppModule } from './books-app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BooksAppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [new ConfigService().get<string>('RABBITMQ_URL')],
        queue: new ConfigService().get<string>('BOOKS_QUEUE'),
      },
    }
  );
  await app.listen();
}
bootstrap();
