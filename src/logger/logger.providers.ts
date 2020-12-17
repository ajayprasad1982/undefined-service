import { Provider } from '@nestjs/common';
import { LoggerSrv } from './logger.service';
import { getLoggerToken } from './logger.utils';

function loggerFactory(logger: LoggerSrv, prefix: string) {
  if (prefix) {
    logger.setPrefix(prefix);
  }
  return logger;
}

function createLoggerProvider(prefix: string): Provider<LoggerSrv> {
  return {
    provide: getLoggerToken(prefix),
    useFactory: logger => loggerFactory(logger, prefix),
    inject: [LoggerSrv],
  };
}

/**
 * Creates Logger providers for each given prefix
 */
export function createLoggerProviders(prefixes: string[]): Array<Provider<LoggerSrv>> {
  return prefixes.map(prefix => createLoggerProvider(prefix));
}
