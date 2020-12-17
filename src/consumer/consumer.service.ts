import { Injectable } from "@nestjs/common";
import { RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { Rabbitmq } from "../enum/rabbitmq";
@Injectable()
export class ConsumerService {
  constructor() {}
  @RabbitSubscribe({
    exchange: Rabbitmq.TOPIC_EXCHANGE_NAME,
    routingKey: Rabbitmq.UPLOAD_DOC_ROUTING_KEY_NAME,
    queue: Rabbitmq.UPLOAD_DOC_QUEUE_NAME,
    queueOptions: {
      durable: true,
      exclusive: false,
      autoDelete: false,
    },
  })
  public async pubSubHandler(msg: {}) {
    console.log(`Received message: ${JSON.stringify(msg)}`);
  }
  @RabbitSubscribe({
    exchange: Rabbitmq.TOPIC_EXCHANGE_NAME,
    routingKey: Rabbitmq.UPLOAD_DOC_ROUTING_KEY_NAME,
    queue: Rabbitmq.UPLOAD_DOC_QUEUE_NAME,
    queueOptions: {
      durable: true,
      exclusive: false,
      autoDelete: false,
    },
  })
  public async pubSubHandler1(msg: {}) {
    console.log(`Received message----1: ${JSON.stringify(msg)}`);
  }
  @RabbitSubscribe({
    exchange: Rabbitmq.TOPIC_EXCHANGE_NAME,
    routingKey: Rabbitmq.UPLOAD_DOC_ROUTING_KEY_NAME,
    queue: Rabbitmq.UPLOAD_DOC_QUEUE_NAME,
    queueOptions: {
      durable: true,
      exclusive: false,
      autoDelete: false,
    },
  })
  public async pubSubHandler2(msg: {}) {
    console.log(`Received message----2: ${JSON.stringify(msg)}`);
  }
  @RabbitSubscribe({
    exchange: Rabbitmq.TOPIC_EXCHANGE_NAME,
    routingKey: Rabbitmq.UPLOAD_DOC_ROUTING_KEY_NAME,
    queue: Rabbitmq.UPLOAD_DOC_QUEUE_NAME,
    queueOptions: {
      durable: true,
      exclusive: false,
      autoDelete: false,
    },
  })
  public async pubSubHandler3(msg: {}) {
    console.log(`Received message----3: ${JSON.stringify(msg)}`);
  }
}
