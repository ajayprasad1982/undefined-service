import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./filter/allExceptions.filter";
import { LoggerSrv } from "./logger/logger.service";
import { ConfigService } from "@nestjs/config";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggerService = app.resolve(LoggerSrv);
  const configService = app.get(ConfigService);
  app.useGlobalFilters(new AllExceptionsFilter(await loggerService));
  app.setGlobalPrefix("v1");
  const port = configService.get("port");
  (await loggerService).setPrefix("Main");
  await app.listen(port);
  (await loggerService).log(`Server started with port ${port}`);
  (await loggerService).log(`Rabbit MQ connection details ${configService.get('RABBIT_URI')}`);
}
bootstrap();
