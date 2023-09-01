import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import * as dotenv from "dotenv";
import * as process from "process";

dotenv.config();
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      forbidNonWhitelisted: true,
      enableDebugMessages: true,
    })
  );
  app.setGlobalPrefix("api");
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("BLIZHE API")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  app.setGlobalPrefix("api");
  await app.listen(process.env.API_PORT, () =>
    console.log(`Server is listening on port ${process.env.API_PORT ||2000}`)
  );
}

bootstrap();
