import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiForbiddenResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from './auth.guard.js';
import { AuthService } from './auth.service.js';
import { AuthorizationService } from './authorization.service.js';
import { SuperAdminGuard } from '../../common/guards/super-admin.guard.js';
import { CurrentUser } from './current-user.decorator.js';
import { DevTokenEnvironmentGuard } from './dev-token-environment.guard.js';
import { DevTokenRateLimitGuard } from './dev-token-rate-limit.guard.js';
import { CreateDevTokenDto } from './dto/create-dev-token.dto.js';
import { AssignSystemRoleDto } from './dto/assign-system-role.dto.js';
import type { AuthenticatedUser } from './auth.types.js';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authorizationService: AuthorizationService,
  ) {}

  @Post('dev/token')
  @HttpCode(HttpStatus.OK)
  @UseGuards(DevTokenEnvironmentGuard, DevTokenRateLimitGuard)
  @ApiOperation({ summary: 'Obtain a Supabase token for development API testing.' })
  @ApiBody({ type: CreateDevTokenDto })
  @ApiOkResponse({ description: 'Supabase token pair issued.' })
  @ApiUnauthorizedResponse({ description: 'Invalid development credentials.' })
  @ApiNotFoundResponse({ description: 'Unavailable outside development/testing.' })
  @ApiTooManyRequestsResponse({ description: 'Development token request limit exceeded.' })
  devToken(@Body() input: CreateDevTokenDto) {
    return this.authService.createDevelopmentToken(input);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ description: 'Current Supabase-authenticated user.' })
  @ApiUnauthorizedResponse({ description: 'Missing, invalid, or expired token.' })
  me(@CurrentUser() user: AuthenticatedUser) {
    return { data: user };
  }

  @Get('session')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Current user identity and Evdance authorization context.' })
  @ApiOkResponse({ description: 'Current session, platform role, and school memberships.' })
  @ApiUnauthorizedResponse({ description: 'Missing, invalid, or expired token.' })
  async session(@CurrentUser() user: AuthenticatedUser) {
    return { data: await this.authorizationService.getSession(user) };
  }

  @Post('system-role-assignments')
  @UseGuards(AuthGuard, SuperAdminGuard)
  @ApiOperation({ summary: 'Assign an initial system role to a Supabase user.' })
  @ApiBody({ type: AssignSystemRoleDto })
  @ApiOkResponse({ description: 'System role assigned idempotently.' })
  @ApiUnauthorizedResponse({ description: 'Missing, invalid, or expired token.' })
  @ApiForbiddenResponse({ description: 'Platform Super Admin access is required.' })
  async assignSystemRole(@Body() input: AssignSystemRoleDto) {
    return { data: await this.authorizationService.assignSystemRole(input) };
  }
}
