import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat.gateway';
import { VideoGateway } from './video.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ChatGateway, VideoGateway],
})
export class AppModule {}
