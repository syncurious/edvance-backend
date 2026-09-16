import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module.js';
import { AppConfigService } from './config/config.service.js';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter.js';
import { ApplicationError } from './common/exceptions/application.error.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(AppConfigService);
  app.enableShutdownHooks();
  app.use(helmet());
  app.enableCors({ origin: config.corsOrigin, credentials: true });
  app.setGlobalPrefix('api/v1');
  app.use((request: Request, response: Response, next: NextFunction) => {
    response.setHeader(
      'x-request-id',
      request.header('x-request-id') ?? crypto.randomUUID(),
    );
    next();
  });
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) =>
        new ApplicationError(
          'VALIDATION_ERROR',
          'Request validation failed.',
          400,
          {
            fields: Object.fromEntries(
              errors.map((error) => [
                error.property,
                Object.values(error.constraints ?? {}),
              ]),
            ),
          },
        ),
    }),
  );
  if (!config.isProduction) {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Evdance API')
        .setVersion('1.0')
        .addBearerAuth()
        .build(),
    );
    SwaggerModule.setup('api/docs', app, document);
  }
  await app.listen(config.port);
}
await bootstrap();
