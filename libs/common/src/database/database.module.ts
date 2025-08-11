import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const username = configService.get<string>('MONGODB_USERNAME');
        const password = configService.get<string>('MONGODB_ROOT_PASSWORD');
        const host = configService.get<string>('MONGODB_URI');
        const uri = host.replace('mongodb://', `mongodb://${username}:${password}@`);
        console.log('database connection string:', uri);
        return ({
          uri,
        })
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule { }
