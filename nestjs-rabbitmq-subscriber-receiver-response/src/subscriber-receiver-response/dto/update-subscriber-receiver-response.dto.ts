import { PartialType } from '@nestjs/mapped-types';
import { CreateSubscriberReceiverResponseDto } from './create-subscriber-receiver-response.dto';

export class UpdateSubscriberReceiverResponseDto extends PartialType(CreateSubscriberReceiverResponseDto) {}
