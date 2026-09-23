import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import type { Request } from 'express';
import { ApplicationError } from '../../common/exceptions/application.error.js';

const MAX_REQUESTS = 5;
const WINDOW_MS = 60_000;

type RateLimitEntry = {
  attempts: number;
  resetAt: number;
};

@Injectable()
export class DevTokenRateLimitGuard implements CanActivate {
  private readonly requests = new Map<string, RateLimitEntry>();

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const key = request.ip ?? request.socket.remoteAddress ?? 'unknown';
    const now = Date.now();
    const current = this.requests.get(key);

    if (!current || current.resetAt <= now) {
      this.requests.set(key, { attempts: 1, resetAt: now + WINDOW_MS });
      return true;
    }

    if (current.attempts >= MAX_REQUESTS) {
      throw new ApplicationError(
        'TOO_MANY_REQUESTS',
        'Too many development token requests. Try again later.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    current.attempts += 1;
    return true;
  }
}
