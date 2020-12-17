import { Injectable } from "@nestjs/common";
import { RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { Rabbitmq } from "../enum/rabbitmq";
import { PublishMessage } from "src/model/publish.message";
import { Logger } from "src/logger/logger.decorator";
import { LoggerSrv } from "src/logger/logger.service";
@Injectable()
export class ConsumerService {
  constructor(@Logger("ConsumerService") private logger: LoggerSrv) {
  }
   @RabbitSubscribe({
    exchange: Rabbitmq.TOPIC_EXCHANGE_NAME,
    routingKey: "upload.doc.routing.key",
    queue: "test.queue",
    queueOptions: {
      durable: true,
      exclusive: false,
      autoDelete: false,
    },
    errorHandler:()=>{console.log("I am error")}
  }) 
  public  pubSubHandler(msg:PublishMessage) {
    this.logger.log(`Received message: ${JSON.stringify(msg.payload)}`);
  }
}
