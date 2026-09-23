import { Injectable } from '@nestjs/common';
import { z } from 'zod';

const environmentSchema = z.object({
  APP_ENV: z
    .enum(['local', 'development', 'test', 'staging', 'production'])
    .default('local'),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().url(),
  CORS_ORIGIN: z.string().url().default('http://localhost:3001'),
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string().min(1),
  SUPER_ADMIN_USER_IDS: z.string().default(''),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

@Injectable()
export class AppConfigService {
  private readonly environment = environmentSchema.parse(process.env);

  get port(): number {
    return this.environment.PORT;
  }
  get databaseUrl(): string {
    return this.environment.DATABASE_URL;
  }
  get corsOrigin(): string {
    return this.environment.CORS_ORIGIN;
  }
  get supabaseUrl(): string {
    return this.environment.SUPABASE_URL;
  }
  get supabaseAnonKey(): string {
    return this.environment.SUPABASE_ANON_KEY;
  }
  get superAdminUserIds(): ReadonlySet<string> {
    return new Set(
      this.environment.SUPER_ADMIN_USER_IDS.split(',')
        .map((id) => id.trim())
        .filter(Boolean),
    );
  }
  get isProduction(): boolean {
    return this.environment.APP_ENV === 'production';
  }

  get isDevelopmentOrTest(): boolean {
    return ['local', 'development', 'test'].includes(this.environment.APP_ENV);
  }
}
