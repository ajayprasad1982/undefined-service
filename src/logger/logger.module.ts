import { DynamicModule, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerSrv } from './logger.service';
import { createLoggerProviders } from './logger.providers';
@Global()
export class LoggerModule {
  static prefixesForLoggers: string[] = new Array<string>();
  static forRoot(): DynamicModule {
    const prefixedLoggerProviders = createLoggerProviders(this.prefixesForLoggers);
    return {
      module: LoggerModule,
      imports:[ConfigModule],
      providers: [LoggerSrv, ...prefixedLoggerProviders],
      exports: [LoggerSrv, ...prefixedLoggerProviders],
    };
  }
}



