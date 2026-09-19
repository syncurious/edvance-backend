import type { Request } from 'express';
import type { AuthenticatedUser } from './auth.types.js';

export interface AuthenticatedRequest extends Request {
  authenticatedUser?: AuthenticatedUser;
}
