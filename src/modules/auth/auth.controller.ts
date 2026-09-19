import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from './auth.guard.js';
import { CurrentUser } from './current-user.decorator.js';
import type { AuthenticatedUser } from './auth.types.js';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  @Get('me')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ description: 'Current Supabase-authenticated user.' })
  @ApiUnauthorizedResponse({ description: 'Missing, invalid, or expired token.' })
  me(@CurrentUser() user: AuthenticatedUser) {
    return { data: user };
  }
}
