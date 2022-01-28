import { Test, TestingModule } from '@nestjs/testing';
import { PublisherSenderRequestController } from './publisher-sender-request.controller';
import { PublisherSenderRequestService } from './publisher-sender-request.service';

describe('PublisherSenderRequestController', () => {
  let controller: PublisherSenderRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublisherSenderRequestController],
      providers: [PublisherSenderRequestService],
    }).compile();

    controller = module.get<PublisherSenderRequestController>(PublisherSenderRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
