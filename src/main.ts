import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.getOrThrow('PORT') || 3000;
  app.getHttpAdapter().getInstance().disable('x-powered-by');
  await app.listen(port, () => {
    `Server is running at http://localhost:${port}`;
  });
}
bootstrap();
