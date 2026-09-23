import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { ApplicationError } from '../../common/exceptions/application.error.js';
import { AppConfigService } from '../../config/config.service.js';
import type { CreateDevTokenDto } from './dto/create-dev-token.dto.js';
import type { DevTokenResponse } from './dev-token.types.js';
import type { AuthenticatedUser } from './auth.types.js';

@Injectable()
export class AuthService {
  private readonly supabase;
  private readonly supabaseUrl: string;
  private readonly supabaseAnonKey: string;

  constructor(config: AppConfigService) {
    this.supabaseUrl = config.supabaseUrl;
    this.supabaseAnonKey = config.supabaseAnonKey;
    this.supabase = createClient(this.supabaseUrl, this.supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  async authenticateAccessToken(token: string): Promise<AuthenticatedUser> {
    const { data, error } = await this.supabase.auth.getUser(token);

    if (error || !data.user) {
      throw new UnauthorizedException('Authentication is required.');
    }

    return {
      id: data.user.id,
      email: data.user.email ?? null,
    };
  }

  async createDevelopmentToken(
    input: CreateDevTokenDto,
  ): Promise<DevTokenResponse> {
    let response: Response;

    try {
      response = await fetch(
        new URL(
          '/auth/v1/token?grant_type=password',
          this.supabaseUrl,
        ).toString(),
        {
          method: 'POST',
          headers: {
            apikey: this.supabaseAnonKey,
            'content-type': 'application/json',
          },
          body: JSON.stringify(input),
        },
      );
    } catch {
      throw this.authenticationProviderUnavailable();
    }

    if (!response.ok) {
      if (response.status >= 400 && response.status < 500) {
        throw new UnauthorizedException('Invalid email or password.');
      }

      throw this.authenticationProviderUnavailable();
    }

    const payload = await this.readDevTokenResponse(response);

    if (!isDevTokenResponse(payload)) {
      throw this.authenticationProviderUnavailable();
    }

    return {
      access_token: payload.access_token,
      refresh_token: payload.refresh_token,
      expires_in: payload.expires_in,
      token_type: payload.token_type,
    };
  }

  extractBearerToken(authorization: string | undefined): string {
    const [scheme, token] = authorization?.split(' ') ?? [];

    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('Authentication is required.');
    }

    return token;
  }

  private authenticationProviderUnavailable(): ApplicationError {
    return new ApplicationError(
      'AUTH_PROVIDER_UNAVAILABLE',
      'Authentication service is temporarily unavailable.',
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }

  private async readDevTokenResponse(response: Response): Promise<unknown> {
    try {
      return await response.json();
    } catch {
      throw this.authenticationProviderUnavailable();
    }
  }
}

function isDevTokenResponse(value: unknown): value is DevTokenResponse {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const response = value as Record<string, unknown>;
  return (
    typeof response.access_token === 'string' &&
    typeof response.refresh_token === 'string' &&
    typeof response.expires_in === 'number' &&
    Number.isFinite(response.expires_in) &&
    typeof response.token_type === 'string'
  );
}
