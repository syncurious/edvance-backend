import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { AppConfigService } from '../../config/config.service.js';
import * as authorizationSchema from './schema/authorization.js';
import * as schema from './schema/schools.js';

const databaseSchema = { ...schema, ...authorizationSchema };

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private readonly pool: Pool;
  readonly db: NodePgDatabase<typeof databaseSchema>;

  constructor(config: AppConfigService) {
    this.pool = new Pool({ connectionString: config.databaseUrl });
    this.db = drizzle(this.pool, { schema: databaseSchema });
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
  }
}
