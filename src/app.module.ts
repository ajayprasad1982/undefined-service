import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './config/config';
import { LoggerModule } from './logger/logger.module';
import { ConsumerService } from './consumer/consumer.service';
import { PublisherModule } from './publisher/publisher.module';
@Module({
  imports: [ConfigModule.forRoot({isGlobal:true,load:[config]}),LoggerModule.forRoot(),PublisherModule],
  controllers: [AppController],
  providers: [AppService, ConsumerService],
})
export class AppModule {}
