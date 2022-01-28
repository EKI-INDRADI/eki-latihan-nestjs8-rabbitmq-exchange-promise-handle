import { Test, TestingModule } from '@nestjs/testing';
import { PublisherSenderRequestService } from './publisher-sender-request.service';

describe('PublisherSenderRequestService', () => {
  let service: PublisherSenderRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublisherSenderRequestService],
    }).compile();

    service = module.get<PublisherSenderRequestService>(PublisherSenderRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
