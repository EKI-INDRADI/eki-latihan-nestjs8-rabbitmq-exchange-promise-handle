// import { Injectable } from '@nestjs/common';
// import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

// @Injectable()
// export class PublisherSenderRequestService2 {
//   @RabbitSubscribe({
//     exchange: 'ekiexchange2',
//     routingKey: 'publisher-sender-request-service',
//     queue: 'ekiexchange2-queue',
//   })

//   public async pubSubHandler(msg: {}) {
//     console.log(`exchange ekiexchange2 routing_key publisher-sender-request-service received message: \n${JSON.stringify(msg)}`);
//   }

// }
