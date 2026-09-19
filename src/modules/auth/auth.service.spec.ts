import { UnauthorizedException } from '@nestjs/common';
import type { AppConfigService } from '../../config/config.service.js';
import { AuthService } from './auth.service.js';

type AuthClient = {
  auth: {
    getUser: jest.Mock;
  };
};

describe('AuthService', () => {
  let service: AuthService;
  let authClient: AuthClient;

  beforeEach(() => {
    service = new AuthService({
      supabaseUrl: 'https://example.supabase.co',
      supabaseAnonKey: 'test-anon-key',
    } as AppConfigService);
    authClient = (service as unknown as { supabase: AuthClient }).supabase;
  });

  it('extracts a Bearer token', () => {
    expect(service.extractBearerToken('Bearer session-token')).toBe(
      'session-token',
    );
  });

  it('rejects a missing or malformed authorization header', () => {
    expect(() => service.extractBearerToken(undefined)).toThrow(
      UnauthorizedException,
    );
    expect(() => service.extractBearerToken('Basic credentials')).toThrow(
      UnauthorizedException,
    );
  });

  it('returns the minimal verified Supabase identity', async () => {
    authClient.auth.getUser = jest.fn().mockResolvedValue({
      data: { user: { id: 'user-id', email: 'admin@evdance.test' } },
      error: null,
    });

    await expect(service.authenticateAccessToken('session-token')).resolves.toEqual({
      id: 'user-id',
      email: 'admin@evdance.test',
    });
    expect(authClient.auth.getUser).toHaveBeenCalledWith('session-token');
  });

  it('rejects an invalid or expired Supabase token', async () => {
    authClient.auth.getUser = jest.fn().mockResolvedValue({
      data: { user: null },
      error: new Error('invalid token'),
    });

    await expect(
      service.authenticateAccessToken('invalid-token'),
    ).rejects.toThrow(UnauthorizedException);
  });
});
