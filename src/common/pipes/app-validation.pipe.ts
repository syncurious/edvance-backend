import { ValidationPipe } from '@nestjs/common';
import { ApplicationError } from '../exceptions/application.error.js';

export function createAppValidationPipe(): ValidationPipe {
  return new ValidationPipe({
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
  });
}
