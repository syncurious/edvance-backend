import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AppConfigService } from '../../config/config.service.js';
import { AuthService } from '../../modules/auth/auth.service.js';
import type { AuthenticatedRequest } from '../../modules/auth/authenticated-request.type.js';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  constructor(
    private readonly config: AppConfigService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user =
      request.authenticatedUser ??
      (await this.authService.authenticateAccessToken(
        this.authService.extractBearerToken(request.headers.authorization),
      ));

    if (!this.config.superAdminUserIds.has(user.id)) {
      throw new ForbiddenException();
    }

    return true;
  }
}
