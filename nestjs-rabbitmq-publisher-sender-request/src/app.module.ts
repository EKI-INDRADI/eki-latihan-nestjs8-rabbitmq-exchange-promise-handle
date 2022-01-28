import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublisherSenderRequestModule } from './publisher-sender-request/publisher-sender-request.module';

@Module({
  imports: [PublisherSenderRequestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
