import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { PublisherSenderRequestService } from './publisher-sender-request.service';
import { CreatePublisherSenderRequestDto } from './dto/create-publisher-sender-request.dto';
import { UpdatePublisherSenderRequestDto } from './dto/update-publisher-sender-request.dto';
import { lastValueFrom, Observable, firstValueFrom } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

let fix_count = 0
let input_count = 0



@ApiTags('RabbitMQ Publisher/Sender/Request Message')
@Controller('publisher-sender-request')
export class PublisherSenderRequestController {


  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly publisherSenderRequestService: PublisherSenderRequestService
  ) {
    // amqpConnection.init().then(() => {
    //   console.log('amqp connection is ready');
    // }).catch(() => {
    //   console.log('amqp connection is error');
    // })
  }



  bugFixAmqpConnectionPublish_NestJs8_RxJs7 = async (exchange: String, routingKey: String, message: String) => { //InterfaceBugFixAmqpConnectionPublish_NestJs8_RxJs7<String, Object>) => {

    let res_json: any = {}

    input_count += 1

    try {
      let request: any = await this.amqpConnection.init().then(() => {
        this.amqpConnection.publish(`${exchange}`, `${routingKey}`, {
          msg: `${message}`
        })
      })
      let force_firstValueFrom = await firstValueFrom(request, { defaultValue: "FINISH" })

      res_json.statusCode = 1
      res_json.message = "SUCCESS"
      return res_json

    } catch (error) {
      console.log(`
     ==================================================================
     INPUT COUNT: ${input_count}
     FIX COUNT : ${fix_count += 1}
     ==================================================================
     fix bug await, promise, toPromise() is deprecated in rxjs 7++ \n
     fix with promise + await + firstValueFrom + try catch \n
     try publish . . .

     note : fix rxjs 7++ undefined value by eki 
     ==================================================================
     `)

      try {
        let request: any = await this.amqpConnection.init().then(() => {
          this.amqpConnection.publish(`${exchange}`, `${routingKey}`, {
            msg: `${message}`
          })
        })
        let force_firstValueFrom = await firstValueFrom(request, { defaultValue: "FINISH" })

        res_json.statusCode = 1
        res_json.message = "SUCCESS"
        return res_json

      } catch (error) {
        // SHUTUP ERROR
      }

    }

  }




  @Get('/ekitesting')
  async send() {

    let res_json: any = {}

    input_count += 1

    try {
      let data: any = await this.amqpConnection.init().then(() => {
        this.amqpConnection.publish('ekiexchange1', 'publisher-sender-request-service', {
          msg: `${Date.now()}`
        })

      })
      let force_firstValueFrom = await firstValueFrom(data, { defaultValue: "FINISH" })

      console.log(force_firstValueFrom)


      res_json.statusCode = 1
      res_json.message = "SUCCESS"
      return res_json

    } catch (error) {
      console.log(`
     ==================================================================
     INPUT COUNT: ${input_count}
     FIX COUNT : ${fix_count += 1}
     ==================================================================
     fix bug await, promise, toPromise() is deprecated in rxjs 7++ \n
     fix with promise + await + firstValueFrom + try catch \n
     try publish . . .

     note : fix rxjs 7++ undefined value by eki 
     ==================================================================
     `)

      try {
        let data: any = await this.amqpConnection.init().then(() => {
          this.amqpConnection.publish('ekiexchange1', 'publisher-sender-request-service', {
            msg: `${Date.now()}`
          })

        })

        let force_firstValueFrom = await firstValueFrom(data, { defaultValue: "FINISH" })

        console.log(force_firstValueFrom)

        res_json.statusCode = 1
        res_json.message = "SUCCESS"
        return res_json

        return 'ok';
      } catch (error) {

        res_json.statusCode = 0
        res_json.message = "ERROR PROMISE"
        return res_json


      }

    }


    // return 'ok';

  }

  @Post('rabbitmq-sender')
  async createRabbitMqSender(@Body() createPublisherSenderRequestDto: CreatePublisherSenderRequestDto): Promise<Observable<any>> { //: Promise<Observable<any>> {

    let res_json: any = {}
    try {

      createPublisherSenderRequestDto.id = String(
        new Date().getFullYear()
        + ("0" + (new Date().getMonth() + 1)).slice(-2)
        + ("0" + new Date().getDate()).slice(-2)
        + ("0" + new Date().getMinutes()).slice(-2)
        + ("0" + new Date().getSeconds()).slice(-2)
        + ("0" + new Date().getMilliseconds()).slice(-3)
      )

      createPublisherSenderRequestDto.create_at = new Date() // Date.now()

      if (createPublisherSenderRequestDto.exchange == "ekiexchange1/ekiexchange2") {
        res_json.statusCode = 0
        res_json.message = "exchange which one ekiexchange1 or ekiexchange2"
        return res_json
      }

      if (
        createPublisherSenderRequestDto.routing_key == "all-service" ||
        createPublisherSenderRequestDto.routing_key == "publisher-sender-request-service" ||
        createPublisherSenderRequestDto.routing_key == "subscriber-receiver-response-service"
      ) {

      } else {
        res_json.statusCode = 0
        res_json.message = "routing_key which one all-service/publisher-sender-request-service/subscriber-receiver-response-service"
        return res_json
      }


      if (
        createPublisherSenderRequestDto.routing_key == "all-service"
      ) {

        let req_body = {
          ...createPublisherSenderRequestDto
        }
        delete req_body.routing_key
        delete req_body.exchange

        let res1 = await this.bugFixAmqpConnectionPublish_NestJs8_RxJs7(
          createPublisherSenderRequestDto.exchange,
          "publisher-sender-request-service",
          JSON.stringify(req_body)
        )

        let res2 = await this.bugFixAmqpConnectionPublish_NestJs8_RxJs7(
          createPublisherSenderRequestDto.exchange,
          "subscriber-receiver-response-service",
          JSON.stringify(req_body)
        )

        if (res1 && res2) {
          res_json.statusCode = 1
          res_json.message = "SUCCESS"
          return res_json
        } else {
          res_json.statusCode = 0
          res_json.message = "ERROR"
          return res_json
        }

      } else {
        let req_body = {
          ...createPublisherSenderRequestDto
        }
        delete req_body.routing_key
        delete req_body.exchange

        return this.bugFixAmqpConnectionPublish_NestJs8_RxJs7(
          createPublisherSenderRequestDto.exchange,
          createPublisherSenderRequestDto.routing_key,
          JSON.stringify(req_body)
        )

      } // end if

    } catch (error) {
      res_json.statusCode = 0
      res_json.message = error.message
      return res_json
    }

  }


  @Post()
  create(@Body() createPublisherSenderRequestDto: CreatePublisherSenderRequestDto) {
    return this.publisherSenderRequestService.create(createPublisherSenderRequestDto);
  }

  @Get()
  findAll() {
    return this.publisherSenderRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publisherSenderRequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublisherSenderRequestDto: UpdatePublisherSenderRequestDto) {
    return this.publisherSenderRequestService.update(+id, updatePublisherSenderRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publisherSenderRequestService.remove(+id);
  }


}
