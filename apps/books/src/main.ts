import { NestFactory } from '@nestjs/core';
import { BooksAppModule } from './books-app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // const configService = new ConfigService();
  // const host = configService.get<string>('RABBITMQ_URL');
  // const port = configService.get<number>('BOOKS_QUEUE');
  // console.log('Books Service - RABBITMQ(url):', host, ' queue:', port);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BooksAppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [new ConfigService().get<string>('RABBITMQ_URL')],
        queue: new ConfigService().get<string>('BOOKS_QUEUE'),
        socketOptions: { 
          heartbeat: 60,
        },
        persistent: true, 
      },
    }
  );
  await app.listen();
}
bootstrap();
