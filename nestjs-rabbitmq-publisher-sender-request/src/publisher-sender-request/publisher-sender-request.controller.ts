import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { PublisherSenderRequestService } from './publisher-sender-request.service';
import { CreatePublisherSenderRequestDto, CreatePublisherSenderRequestDtoLoop } from './dto/create-publisher-sender-request.dto';
import { UpdatePublisherSenderRequestDto } from './dto/update-publisher-sender-request.dto';
import { lastValueFrom, Observable, firstValueFrom } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Console } from 'console';


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

  bugFixAmqpConnectionPublish_NestJs8_RxJs7_v2 = async (exchange: String, routingKey: String, message: String) => { //InterfaceBugFixAmqpConnectionPublish_NestJs8_RxJs7<String, Object>) => {


    // ==================================================================
    // because NestJs8 , hit controller bug promise handle & rxjs toPromise() is deprecated in rxjs 7++ , effort to fix this

    // [Nest] 1356  - 01/28/2022, 22:13:10     LOG [AmqpConnection] Successfully connected to a RabbitMQ broker
    // [Nest] 1356  - 01/28/2022, 22:13:10     LOG [AmqpConnection] Trying to connect to a RabbitMQ broker
    // [Nest] 1356  - 01/28/2022, 22:13:10     LOG [AmqpConnection] Successfully connected a RabbitMQ channel "AmqpConnection"

    // solved by node_modules documentation node_modules\@golevelup\nestjs-rabbitmq\lib\amqp\connection.d.ts

    // await this.amqpConnection.init().then(async () => {
    // ==================================================================

    let res_json: any = {}


    try {

      //========================= SETELAH BUG FIX RECEIVER QUEUE SERVICES UDAH GA PERLU PROMISE INIT 
      // let request: any = await this.amqpConnection.init().then(async () => {

      await this.amqpConnection.publish(`${exchange}`, `${routingKey}`, {
        msg: `${message}`
      }).then(async () => {
        res_json.statusCode = 1
        res_json.message = `SUCCESS SENT ROUTING KEY : ${routingKey}`

        return res_json
      }).catch(async err => {
        res_json.statusCode = 0
        res_json.message = `ERROR SENT ROUTING KEY : ${routingKey}, detail : ${err}`

        return res_json
      })

       

      // }).catch(async err => {
      //   res_json.statusCode = 0
      //   res_json.message = `ERROR INIT CONNECTION, detail : ${err}`

      //   return res_json
      // })

       //========================= /SETELAH BUG FIX RECEIVER QUEUE SERVICES UDAH GA PERLU PROMISE INIT 

      // EKI NOTE : 

      // publisher-sender-request.service.ts <<< PADA SERVICE RECIEVER PASTIKAN  JANGAN MENGGUNAKAN QUEUE
      // BIAR DARI EXCHANGE YANG GENERATE QUEUE NYA BIAR GA DOUBLE HIT

      // let force_firstValueFrom = await firstValueFrom(request, { defaultValue: "FINISH" })


      return res_json


    } catch (error) {
      res_json.statusCode = 0
      res_json.message = error.message
      return res_json

    }

  }


  @Post('rabbitmq-sender-loop')
  async createRabbitMqSenderLoop(@Body() createPublisherSenderRequestDtoLoop: CreatePublisherSenderRequestDtoLoop): Promise<Observable<any>> { //: Promise<Observable<any>> {

    let res_json: any = {}




    try {


      if (createPublisherSenderRequestDtoLoop.exchange != "ekiexchange1") {
        res_json.statusCode = 0
        res_json.message = "which ekiexchange1"
        return res_json
      }

      if (
        createPublisherSenderRequestDtoLoop.routing_key == "all-service" ||
        createPublisherSenderRequestDtoLoop.routing_key == "publisher-sender-request-service" ||
        createPublisherSenderRequestDtoLoop.routing_key == "subscriber-receiver-response-service"
      ) {


      } else {
        res_json.statusCode = 0
        res_json.message = "routing_key which one all-service/publisher-sender-request-service/subscriber-receiver-response-service"
        return res_json
      }


      if (
        createPublisherSenderRequestDtoLoop.routing_key == "all-service"
      ) {

        createPublisherSenderRequestDtoLoop.id = String(
          new Date().getFullYear()
          + ("0" + (new Date().getMonth() + 1)).slice(-2)
          + ("0" + new Date().getDate()).slice(-2)
          + ("0" + new Date().getMinutes()).slice(-2)
          + ("0" + new Date().getSeconds()).slice(-2)
          + ("0" + new Date().getMilliseconds()).slice(-3)
        )

        createPublisherSenderRequestDtoLoop.create_at = new Date() // Date.now()

        let req_body = {
          ...createPublisherSenderRequestDtoLoop
        }
        delete req_body.routing_key
        delete req_body.exchange


        let loop = createPublisherSenderRequestDtoLoop.loop

        let checkStatusCode: any = []
        for (let i_a = 1; i_a <= loop; i_a++) {

          await this.bugFixAmqpConnectionPublish_NestJs8_RxJs7_v2(
            createPublisherSenderRequestDtoLoop.exchange,
            "publisher-sender-request-service",
            `${i_a}`
          ).then(
            async (responsePublisherService: any) => { // FIX PROGRESSIVE BACKEND


              checkStatusCode.push({
                k: "publisher-sender-request-service",
                v: {
                  statusCode: responsePublisherService.statusCode,
                  value: `${i_a}`
                }
              })


              let responseSubscriberService: any = await this.bugFixAmqpConnectionPublish_NestJs8_RxJs7_v2(
                createPublisherSenderRequestDtoLoop.exchange,
                "subscriber-receiver-response-service",
                `${i_a}`
              )

              checkStatusCode.push({
                k: "subscriber-receiver-response-service",
                v: {
                  statusCode: responseSubscriberService.statusCode,
                  value: `${i_a}`
                }
              })

            } // end then async
          ) //end async




          if (i_a == loop) { // FIX PROGRESSIVE BACKEND

            let count_err = 0
            let list_err = []

            // if (checkStatusCode.length > 0) {
            //   await checkStatusCode.forEach(async (check: any) => {
            //     if (check.v.statusCode == 0) {
            //       count_err += 1
            //       list_err.push({
            //         from: check.k,
            //         value: check.v.value
            //       })
            //     } //end if
            //   })
            // } //end if

            res_json.statusCode = 1
            res_json.message = "SUCCESS"
            res_json.statusCodeArr = checkStatusCode
            return res_json

          } //end if

        } // end for



      } else {

        let loop = createPublisherSenderRequestDtoLoop.loop
        for (let i_a = 1; i_a <= loop; i_a++) {

          createPublisherSenderRequestDtoLoop.id = String(
            new Date().getFullYear()
            + ("0" + (new Date().getMonth() + 1)).slice(-2)
            + ("0" + new Date().getDate()).slice(-2)
            + ("0" + new Date().getMinutes()).slice(-2)
            + ("0" + new Date().getSeconds()).slice(-2)
            + ("0" + new Date().getMilliseconds()).slice(-3)
          )

          createPublisherSenderRequestDtoLoop.create_at = new Date() // Date.now()

          createPublisherSenderRequestDtoLoop.count = i_a

          let req_body = {
            ...createPublisherSenderRequestDtoLoop
          }
          delete req_body.routing_key
          delete req_body.exchange


          await this.bugFixAmqpConnectionPublish_NestJs8_RxJs7_v2(
            createPublisherSenderRequestDtoLoop.exchange,
            createPublisherSenderRequestDtoLoop.routing_key,
            JSON.stringify(req_body)
          )

          if (i_a == loop) {
            res_json.statusCode = 1
            res_json.message = "SUCCESS"
            return res_json
          }

        } // end for

      } // end if

    } catch (error) {
      res_json.statusCode = 0
      res_json.message = error.message
      return res_json
    }

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

      // if (createPublisherSenderRequestDto.exchange == "ekiexchange1/ekiexchange2") {
      //   res_json.statusCode = 0
      //   res_json.message = "exchange which one ekiexchange1 or ekiexchange2"
      //   return res_json
      // }

      if (createPublisherSenderRequestDto.exchange != "ekiexchange1") {
        res_json.statusCode = 0
        res_json.message = "which ekiexchange1"
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

        // let res1 = await this.bugFixAmqpConnectionPublish_NestJs8_RxJs7(
        let res1 = await this.bugFixAmqpConnectionPublish_NestJs8_RxJs7_v2(
          createPublisherSenderRequestDto.exchange,
          "publisher-sender-request-service",
          JSON.stringify(req_body)
        )

        // let res2 = await this.bugFixAmqpConnectionPublish_NestJs8_RxJs7(
        let res2 = await this.bugFixAmqpConnectionPublish_NestJs8_RxJs7_v2(
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

        // return this.bugFixAmqpConnectionPublish_NestJs8_RxJs7(
        return await this.bugFixAmqpConnectionPublish_NestJs8_RxJs7_v2(
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
