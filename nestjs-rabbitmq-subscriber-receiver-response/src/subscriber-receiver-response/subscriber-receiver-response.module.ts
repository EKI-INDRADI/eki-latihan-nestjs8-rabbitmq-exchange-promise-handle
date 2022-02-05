import { Module } from '@nestjs/common';
import { SubscriberReceiverResponseService } from './subscriber-receiver-response.service';
import { SubscriberReceiverResponseController } from './subscriber-receiver-response.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
// import { SubscriberReceiverResponseService2 } from './subscriber-receiver-response.service2';


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
    }),
    SubscriberReceiverResponseModule,
  ],
  controllers: [SubscriberReceiverResponseController],
  providers: [SubscriberReceiverResponseService]
  // providers: [SubscriberReceiverResponseService, SubscriberReceiverResponseService2]
})
export class SubscriberReceiverResponseModule {}
