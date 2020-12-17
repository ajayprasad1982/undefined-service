import { Inject, Injectable, Logger, Scope} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import _ =  require("lodash");
import graylog2 = require("graylog2");
import uuid = require("uuid");

@Injectable()
export class LoggerSrv extends Logger { 
  private prefix?: string;
  constructor(@Inject(REQUEST) private request: Request,private configService: ConfigService) {
    super();
  }
 
  private grayLogger: any = new graylog2.graylog({
    servers: [{host:this.configService.get("graylog.host"), port: this.configService.get("graylog.port")}],
  });

  private getData = (data: any): Array<any> => {
    const [shortMessage, longMessage, extraInfo] = data;
    const application = this.configService.get("appName");
    
     const correlationId = this.request?.headers['x-correlation-id']?? `${application}${uuid()}`;
    const info = {
      application,
      correlationId,
    };
    console.log("correlationId",correlationId)
    // if only data object if provided
    if (_.isPlainObject(shortMessage)) {
      return [_.assign({}, shortMessage, info)];
    }
    // if a short message and data object is provided
    if (_.isPlainObject(longMessage)) {
      return [shortMessage, _.assign({}, longMessage, info)];
    }
    // if short, long message and data object provided
    if (_.isPlainObject(extraInfo)) {
      return [shortMessage, longMessage, _.assign({}, extraInfo, info)];
    }
    return [...data, info];
  };

  private logHandler = (level:string, ...data: any[]) => {

    try {
      const processedData: Array<any> = this.getData(data);
  
      //console.log("configService - logging.isEnabled: ",this.configService.get("graylog.isEnabled"));
      if (this.configService.get("graylog.isEnabled")) {
        //console.log("configService - processedData: ",processedData);
        this.grayLogger[level](...processedData); 
      }
  
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error); 
    }
  };

  log(message:string) {
    message = this.prefix ?`[${this.prefix}] ${message}`: message
    super.log(message);
    this.logHandler("log", message);
  /* your implementation */
  }
  error(message:string) {
    message = this.prefix ?`[${this.prefix}] ${message}`: message
    super.error(message);
    /* your implementation */
    this.logHandler("error", message);
  }
  warn(message:string) {
    message = this.prefix ?`[${this.prefix}] ${message}`: message
    super.warn(message);
    /* your implementation */
    this.logHandler("warn", message);
  }
  debug(message:string) {
    message = this.prefix ?`[${this.prefix}] ${message}`: message
    super.debug(message);
    this.logHandler("debug", message);
    /* your implementation */
  }
  verbose(message:string) {
    message = this.prefix ?`[${this.prefix}] ${message}`: message
    super.verbose(message);
    this.logHandler("verbose", message);
  }
  /**
   * Set the prefix of every log message
   *
   * @param prefix The prefix which should be prepended before every log message
   */
  setPrefix(prefix: string) {
    this.prefix = prefix;
  }
}