import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import type { Request } from 'express';
import { AppConfigService } from '../../config/config.service.js';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  private readonly supabase;

  constructor(private readonly config: AppConfigService) {
    this.supabase = createClient(config.supabaseUrl, config.supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);
    const { data, error } = await this.supabase.auth.getUser(token);
    if (error || !data.user) throw new UnauthorizedException();
    if (!this.config.superAdminUserIds.has(data.user.id))
      throw new ForbiddenException();
    return true;
  }

  private extractToken(request: Request): string {
    const [scheme, token] = request.headers.authorization?.split(' ') ?? [];
    if (scheme !== 'Bearer' || !token) throw new UnauthorizedException();
    return token;
  }
}
