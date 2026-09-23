import type { ExecutionContext } from '@nestjs/common';
import { ApplicationError } from '../../common/exceptions/application.error.js';
import { DevTokenRateLimitGuard } from './dev-token-rate-limit.guard.js';

describe('DevTokenRateLimitGuard', () => {
  it('allows five requests per IP address per minute and rejects the sixth', () => {
    const guard = new DevTokenRateLimitGuard();
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ ip: '127.0.0.1', socket: {} }),
      }),
    } as ExecutionContext;

    for (let attempt = 0; attempt < 5; attempt += 1) {
      expect(guard.canActivate(context)).toBe(true);
    }

    expect(() => guard.canActivate(context)).toThrow(
      ApplicationError,
    );
  });
});
