import { Module } from '@nestjs/common';
import { PublisherSenderRequestService } from './publisher-sender-request.service';
import { PublisherSenderRequestController } from './publisher-sender-request.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { PublisherSenderRequestService2 } from './publisher-sender-request.service2';

@Module({
  imports:  [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'ekiexchange1',
          type: 'topic',
        },
        // {
        //   name: 'ekiexchange2', // multi exchange has issue eki tested 2022-01-28
        //   type: 'topic',
        // },
      ],
      uri: 'amqp://ekiuser:ekipassword@0.0.0.0:5672',
      // connectionInitOptions: { wait: true }, // PROMISE/AWAIT GAK MEMPAN
    }),
     PublisherSenderRequestModule,
  ],
  controllers: [PublisherSenderRequestController],
  providers: [PublisherSenderRequestService, PublisherSenderRequestService2]
})
export class PublisherSenderRequestModule { }
