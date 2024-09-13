import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import * as morgan from 'morgan';

async function bootstrap() {
  const logger = new Logger('Payments-ms');
  const app = await NestFactory.create(AppModule,
    {
      rawBody: true,
    }
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  //app.use(morgan('combined'));
  await app.listen(envs.PORT);
  logger.log(`Payments-ms is running on: ${await app.getUrl()}`);
}
bootstrap();
