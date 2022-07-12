import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Constants } from './common/constants/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); //Enable validation pipes in order to enforce DTO consistency
  app.enableCors();
  await app.listen(Constants.PORT);
}

bootstrap();
