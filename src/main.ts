import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export class SocketAdapter extends IoAdapter {
  createIOServer(
    port: number,
    options?: ServerOptions & {
      namespace?: string;
      server?: any;
    },
  ) {
    const server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: '*',
        allowedHeaders: ['Access-Control-Allow-Private-Network'],
        methods: ['GET', 'POST'],
      },
    });
    return server;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.useWebSocketAdapter(new SocketAdapter(app));
  // const configService = app.get(ConfigService);
  // const PORT = +configService.get<number>('PORT');
  await app.listen(3000, '0.0.0.0');
}

bootstrap();
