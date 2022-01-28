import { ApiHideProperty, ApiProperty, OmitType } from "@nestjs/swagger";

export class CreatePublisherSenderRequestDto {
    @ApiHideProperty()
    id: String

    @ApiProperty({ required: true, default: 'eki testing' })
    message: string

    @ApiProperty({ required: true, default: 'ekiexchange1' }) // default: 'ekiexchange1/ekiexchange2' }) multi exchange has issue eki tested 2022-01-28
    exchange: string

    @ApiProperty({ required: true, default: 'all-service/publisher-sender-request-service/subscriber-receiver-response-service' })
    routing_key: string

    @ApiHideProperty()
    create_at: Date
}


export class CreatePublisherSenderRequestDtoLoop extends OmitType(CreatePublisherSenderRequestDto, ['message']){
    @ApiProperty({ required: true, default: 100})
    loop: number
}