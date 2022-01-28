import { PartialType } from '@nestjs/mapped-types';
import { CreatePublisherSenderRequestDto } from './create-publisher-sender-request.dto';

export class UpdatePublisherSenderRequestDto extends PartialType(CreatePublisherSenderRequestDto) {}
