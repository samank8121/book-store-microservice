import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.TCP,
      options: { 
        host: new ConfigService().get<string>('AUTH_HOST'),
        port: new ConfigService().get<number>('AUTH_PORT') },
    }
  );
  await app.listen();
}
bootstrap();
