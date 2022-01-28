import { Test, TestingModule } from '@nestjs/testing';
import { SubscriberReceiverResponseController } from './subscriber-receiver-response.controller';
import { SubscriberReceiverResponseService } from './subscriber-receiver-response.service';

describe('SubscriberReceiverResponseController', () => {
  let controller: SubscriberReceiverResponseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscriberReceiverResponseController],
      providers: [SubscriberReceiverResponseService],
    }).compile();

    controller = module.get<SubscriberReceiverResponseController>(SubscriberReceiverResponseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
