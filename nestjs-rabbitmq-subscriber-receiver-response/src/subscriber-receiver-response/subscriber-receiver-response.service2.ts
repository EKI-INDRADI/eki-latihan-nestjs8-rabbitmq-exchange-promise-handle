// import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class SubscriberReceiverResponseService2 {
//   @RabbitSubscribe({
//     exchange: 'ekiexchange2',
//     routingKey: ['subscriber-receiver-response-service'], // bs array
//     queue: 'ekiexchange2-queue',
//   })

//   public async pubSubHandler(msg: {}) {
//     console.log(`exchange ekiexchange2 routing_key subscriber-receiver-response-service received message: \n${JSON.stringify(msg)}`);
//   }

// }
