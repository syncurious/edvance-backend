import { NotFoundException } from '@nestjs/common';
import type { AppConfigService } from '../../config/config.service.js';
import { DevTokenEnvironmentGuard } from './dev-token-environment.guard.js';

describe('DevTokenEnvironmentGuard', () => {
  it('allows the endpoint in a development or test environment', () => {
    const guard = new DevTokenEnvironmentGuard({
      isDevelopmentOrTest: true,
    } as unknown as AppConfigService);

    expect(guard.canActivate()).toBe(true);
  });

  it('returns not found outside development or test environments', () => {
    const guard = new DevTokenEnvironmentGuard({
      isDevelopmentOrTest: false,
    } as unknown as AppConfigService);

    expect(() => guard.canActivate()).toThrow(
      NotFoundException,
    );
  });
});
