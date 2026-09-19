import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import type { AuthenticatedRequest } from './authenticated-request.type.js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.authService.extractBearerToken(
      request.headers.authorization,
    );

    request.authenticatedUser = await this.authService.authenticateAccessToken(
      token,
    );
    return true;
  }
}
