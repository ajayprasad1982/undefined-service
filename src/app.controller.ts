import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @Get("/health")
  checkHealth() {
       return { status: "running" };
  }
}
