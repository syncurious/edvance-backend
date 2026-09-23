import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infrastructure/database/database.module.js';
import { AuthorizationRepository } from './authorization.repository.js';
import { AuthorizationService } from './authorization.service.js';
import { AuthController } from './auth.controller.js';
import { AuthGuard } from './auth.guard.js';
import { AuthService } from './auth.service.js';
import { DevTokenEnvironmentGuard } from './dev-token-environment.guard.js';
import { DevTokenRateLimitGuard } from './dev-token-rate-limit.guard.js';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthGuard,
    DevTokenEnvironmentGuard,
    DevTokenRateLimitGuard,
    AuthorizationRepository,
    AuthorizationService,
  ],
  exports: [AuthService, AuthGuard, AuthorizationService],
})
export class AuthModule {}
