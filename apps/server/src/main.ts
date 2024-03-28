import { NestFactory } from '@nestjs/core';
import { ServerModule } from './server.module';

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);

  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
