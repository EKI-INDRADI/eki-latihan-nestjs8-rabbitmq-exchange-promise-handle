import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubscriberReceiverResponseModule } from './subscriber-receiver-response/subscriber-receiver-response.module';

@Module({
  imports: [SubscriberReceiverResponseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
