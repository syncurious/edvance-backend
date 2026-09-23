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

  afterEach(() => {
    jest.restoreAllMocks();
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

  it('obtains and limits a development token response to API token fields', async () => {
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          access_token: 'access-token',
          refresh_token: 'refresh-token',
          expires_in: 3600,
          token_type: 'bearer',
          user: { id: 'user-id' },
        }),
        { status: 200, headers: { 'content-type': 'application/json' } },
      ),
    );

    await expect(
      service.createDevelopmentToken({
        email: 'test@example.com',
        password: 'test-password',
      }),
    ).resolves.toEqual({
      access_token: 'access-token',
      refresh_token: 'refresh-token',
      expires_in: 3600,
      token_type: 'bearer',
    });
    expect(fetchMock).toHaveBeenCalledWith(
      'https://example.supabase.co/auth/v1/token?grant_type=password',
      {
        method: 'POST',
        headers: {
          apikey: 'test-anon-key',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'test-password',
        }),
      },
    );
  });

  it('returns a generic unauthorized error for invalid development credentials', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response('invalid credentials', { status: 400 }));

    await expect(
      service.createDevelopmentToken({
        email: 'test@example.com',
        password: 'invalid-password',
      }),
    ).rejects.toThrow('Invalid email or password.');
  });
});
