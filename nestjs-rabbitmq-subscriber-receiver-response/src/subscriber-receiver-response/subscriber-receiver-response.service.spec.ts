import { Test, TestingModule } from '@nestjs/testing';
import { SubscriberReceiverResponseService } from './subscriber-receiver-response.service';

describe('SubscriberReceiverResponseService', () => {
  let service: SubscriberReceiverResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscriberReceiverResponseService],
    }).compile();

    service = module.get<SubscriberReceiverResponseService>(SubscriberReceiverResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
