import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { SerializeInterceptor } from './common/interceptors/serialize.interceptor.js';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new SerializeInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  console.error('Bootstrap failed:', err);
  process.exit(1);
});
