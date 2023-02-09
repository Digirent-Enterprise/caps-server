import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AppLogger } from "./logger/logger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: new AppLogger(),
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
