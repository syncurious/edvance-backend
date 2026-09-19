import { ForbiddenException } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';
import type { AppConfigService } from '../../config/config.service.js';
import type { AuthService } from '../../modules/auth/auth.service.js';
import type { AuthenticatedRequest } from '../../modules/auth/authenticated-request.type.js';
import { SuperAdminGuard } from './super-admin.guard.js';

describe('SuperAdminGuard', () => {
  const authService = {
    extractBearerToken: jest.fn(),
    authenticateAccessToken: jest.fn(),
  } as unknown as AuthService;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('uses the shared authenticated request identity', async () => {
    const guard = new SuperAdminGuard(
      {
        superAdminUserIds: new Set(['super-admin-id']),
      } as unknown as AppConfigService,
      authService,
    );
    const request = {
      headers: {},
      authenticatedUser: { id: 'super-admin-id', email: 'admin@evdance.test' },
    } as AuthenticatedRequest;

    await expect(canActivate(guard, request)).resolves.toBe(true);
    expect(authService.authenticateAccessToken).not.toHaveBeenCalled();
  });

  it('rejects an authenticated user outside the temporary allowlist', async () => {
    const guard = new SuperAdminGuard(
      {
        superAdminUserIds: new Set(['super-admin-id']),
      } as unknown as AppConfigService,
      authService,
    );
    const request = {
      headers: {},
      authenticatedUser: { id: 'other-user-id', email: 'other@evdance.test' },
    } as AuthenticatedRequest;

    await expect(canActivate(guard, request)).rejects.toThrow(
      ForbiddenException,
    );
  });
});

function canActivate(
  guard: SuperAdminGuard,
  request: AuthenticatedRequest,
) {
  const context = {
    switchToHttp: () => ({ getRequest: () => request }),
  } as ExecutionContext;

  return guard.canActivate(context);
}
