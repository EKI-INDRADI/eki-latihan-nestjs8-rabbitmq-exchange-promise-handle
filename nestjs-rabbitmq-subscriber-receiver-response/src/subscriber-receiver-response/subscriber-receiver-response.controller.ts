import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubscriberReceiverResponseService } from './subscriber-receiver-response.service';
import { CreateSubscriberReceiverResponseDto } from './dto/create-subscriber-receiver-response.dto';
import { UpdateSubscriberReceiverResponseDto } from './dto/update-subscriber-receiver-response.dto';

@Controller('subscriber-receiver-response')
export class SubscriberReceiverResponseController {
  constructor(private readonly subscriberReceiverResponseService: SubscriberReceiverResponseService) { }

  @Post()
  create(@Body() createSubscriberReceiverResponseDto: CreateSubscriberReceiverResponseDto) {
    return this.subscriberReceiverResponseService.create(createSubscriberReceiverResponseDto);
  }

  @Get()
  findAll() {
    return this.subscriberReceiverResponseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriberReceiverResponseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubscriberReceiverResponseDto: UpdateSubscriberReceiverResponseDto) {
    return this.subscriberReceiverResponseService.update(+id, updateSubscriberReceiverResponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscriberReceiverResponseService.remove(+id);
  }

}
