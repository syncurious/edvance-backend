import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { ApplicationError } from '../exceptions/application.error.js';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const request = host.switchToHttp().getRequest<Request>();
    const requestId = request.header('x-request-id') ?? crypto.randomUUID();
    const applicationError =
      exception instanceof ApplicationError ? exception : undefined;
    const httpException =
      exception instanceof HttpException ? exception : undefined;
    const status =
      applicationError?.status ??
      httpException?.getStatus() ??
      HttpStatus.INTERNAL_SERVER_ERROR;
    const body = httpException?.getResponse();
    const message =
      applicationError?.message ??
      (typeof body === 'object' && body && 'message' in body
        ? String(body.message)
        : 'An unexpected error occurred.');
    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `${request.method} ${request.originalUrl} failed (requestId=${requestId})`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    }
    response
      .status(status)
      .setHeader('x-request-id', requestId)
      .json({
        error: {
          code:
            applicationError?.code ??
            (status === 401
              ? 'UNAUTHORIZED'
              : status === 403
                ? 'FORBIDDEN'
                : status === 400
                ? 'BAD_REQUEST'
                : status === 429
                  ? 'TOO_MANY_REQUESTS'
                : status === 404
                  ? 'NOT_FOUND'
                  : 'INTERNAL_ERROR'),
          message,
          details: applicationError?.details ?? null,
          requestId,
        },
      });
  }
}
