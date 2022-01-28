import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { CreateSubscriberReceiverResponseDto } from './dto/create-subscriber-receiver-response.dto';
import { UpdateSubscriberReceiverResponseDto } from './dto/update-subscriber-receiver-response.dto';

@Injectable()
export class SubscriberReceiverResponseService {
  @RabbitSubscribe({
    exchange: 'ekiexchange1',
    routingKey: ['subscriber-receiver-response-service'], // bs array
    queue: 'ekiexchange1-queue',
  })

  public async pubSubHandler(msg: {}) {
    console.log(`exchange ekiexchange1 routing_key subscriber-receiver-response-service received message: \n${JSON.stringify(msg)}`);
  }

  create(createSubscriberReceiverResponseDto: CreateSubscriberReceiverResponseDto) {
    return 'This action adds a new subscriberReceiverResponse';
  }

  findAll() {
    return `This action returns all subscriberReceiverResponse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscriberReceiverResponse`;
  }

  update(id: number, updateSubscriberReceiverResponseDto: UpdateSubscriberReceiverResponseDto) {
    return `This action updates a #${id} subscriberReceiverResponse`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscriberReceiverResponse`;
  }
}
