import {
  CanActivate,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AppConfigService } from '../../config/config.service.js';

@Injectable()
export class DevTokenEnvironmentGuard implements CanActivate {
  constructor(private readonly config: AppConfigService) {}

  canActivate(): boolean {
    if (!this.config.isDevelopmentOrTest) {
      throw new NotFoundException();
    }

    return true;
  }
}
