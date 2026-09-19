import { UnauthorizedException } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';
import type { AuthService } from './auth.service.js';
import { AuthGuard } from './auth.guard.js';
import type { AuthenticatedRequest } from './authenticated-request.type.js';

describe('AuthGuard', () => {
  const authService = {
    extractBearerToken: jest.fn(),
    authenticateAccessToken: jest.fn(),
  } as unknown as AuthService;
  const guard = new AuthGuard(authService);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('stores the verified user in the request context', async () => {
    const request = {
      headers: { authorization: 'Bearer session-token' },
    } as AuthenticatedRequest;
    jest
      .spyOn(authService, 'extractBearerToken')
      .mockReturnValue('session-token');
    jest.spyOn(authService, 'authenticateAccessToken').mockResolvedValue({
      id: 'user-id',
      email: 'user@evdance.test',
    });

    await expect(canActivate(guard, request)).resolves.toBe(true);
    expect(request.authenticatedUser).toEqual({
      id: 'user-id',
      email: 'user@evdance.test',
    });
  });

  it('rejects a request without a valid Bearer token', async () => {
    const request = { headers: {} } as AuthenticatedRequest;
    jest
      .spyOn(authService, 'extractBearerToken')
      .mockImplementation(() => {
        throw new UnauthorizedException('Authentication is required.');
      });

    await expect(canActivate(guard, request)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});

function canActivate(guard: AuthGuard, request: AuthenticatedRequest) {
  const context = {
    switchToHttp: () => ({ getRequest: () => request }),
  } as ExecutionContext;

  return guard.canActivate(context);
}
