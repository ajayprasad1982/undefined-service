import { Body, Controller, Patch} from '@nestjs/common';
import { Logger } from 'src/logger/logger.decorator';
import { LoggerSrv } from 'src/logger/logger.service';
import { PublishMessage } from 'src/model/publish.message';
import { PublisherService } from './publisher.service';

@Controller('publisher')
export class PublisherController {
  constructor(@Logger("PublisherController") private logger: LoggerSrv,private readonly publisherService: PublisherService) {}
  @Patch("/publish")
  async publish(@Body() body: PublishMessage){
    this.logger.log(`request body ${JSON.stringify(body)}`)
    return this.publisherService.publishMessage(body);
  }
}
