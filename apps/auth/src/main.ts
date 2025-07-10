import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const configService = new ConfigService();
  const host = configService.get<string>('AUTH_HOST');
  const port = configService.get<number>('AUTH_PORT');
  console.log('Auth Service - Host:', host, 'Port:', port);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.TCP,
      options: { host, port },
    }
  );

  // Add global exception filter for debugging
  app.useGlobalFilters({
    catch(exception, host) {
      Logger.error('Exception caught:', exception, host);
      throw exception;
    },
  });
  await app.listen();
}
bootstrap();