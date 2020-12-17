import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {Injectable } from '@nestjs/common';
import { Rabbitmq } from 'src/enum/rabbitmq';
import { Logger } from 'src/logger/logger.decorator';
import { LoggerSrv } from 'src/logger/logger.service';
import { PublishMessage } from 'src/model/publish.message';

@Injectable()
export class PublisherService {
    constructor(@Logger("PublisherService") private logger: LoggerSrv,private readonly amqpConnection: AmqpConnection){
    }
    publishMessage(message:PublishMessage):void{
        const routingKey = message.routingKey;
        this?.amqpConnection?.publish(Rabbitmq.TOPIC_EXCHANGE_NAME, routingKey,message.payload,{"x-delay":6000});
       /*  setTimeout(() => {
           
        }, 10*6000); */
        
    }
}
