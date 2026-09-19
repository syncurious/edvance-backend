import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { AppConfigService } from '../../config/config.service.js';
import type { AuthenticatedUser } from './auth.types.js';

@Injectable()
export class AuthService {
  private readonly supabase;

  constructor(config: AppConfigService) {
    this.supabase = createClient(config.supabaseUrl, config.supabaseAnonKey, {
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

  extractBearerToken(authorization: string | undefined): string {
    const [scheme, token] = authorization?.split(' ') ?? [];

    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('Authentication is required.');
    }

    return token;
  }
}
