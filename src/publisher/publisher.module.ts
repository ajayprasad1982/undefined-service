import { Module } from "@nestjs/common";
import { PublisherService } from "./publisher.service";
import { PublisherController } from "./publisher.controller";
import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { Rabbitmq } from "src/enum/rabbitmq";
import { ConfigService } from "@nestjs/config";
@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        exchanges: [
          {
            name: Rabbitmq.TOPIC_EXCHANGE_NAME,
            type: 'topic',
          },
        ],
        uri: config.get('RABBIT_URI'),
        prefetchCount:250,
        connectionInitOptions: { wait: false },
      }),
    }),
  ],
  controllers: [PublisherController],
  providers: [PublisherService],
})
export class PublisherModule {}
