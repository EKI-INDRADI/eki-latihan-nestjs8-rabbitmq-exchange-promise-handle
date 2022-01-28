import { Injectable } from '@nestjs/common';
import { CreatePublisherSenderRequestDto } from './dto/create-publisher-sender-request.dto';
import { UpdatePublisherSenderRequestDto } from './dto/update-publisher-sender-request.dto';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { firstValueFrom } from 'rxjs';

let fix_count = 0
let input_count = 0

@Injectable()
export class PublisherSenderRequestService {
  @RabbitSubscribe({
    exchange: 'ekiexchange1',
    routingKey: 'publisher-sender-request-service',
    queue: 'ekiexchange1-queue',
  })

  public async pubSubHandler(msg: {}) {
    console.log(`exchange ekiexchange1 routing_key publisher-sender-request-service received message: \n${JSON.stringify(msg)}`);
  }



  create(createPublisherSenderRequestDto: CreatePublisherSenderRequestDto) {
    return 'This action adds a new publisherSenderRequest';
  }

  findAll() {
    return `This action returns all publisherSenderRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} publisherSenderRequest`;
  }

  update(id: number, updatePublisherSenderRequestDto: UpdatePublisherSenderRequestDto) {
    return `This action updates a #${id} publisherSenderRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} publisherSenderRequest`;
  }
}
