import { Injectable } from '@nestjs/common';
import { and, asc, count, desc, eq, ilike } from 'drizzle-orm';
import type { SchoolStatus } from './school.types.js';
import { DatabaseService } from '../../infrastructure/database/database.service.js';
import { schools } from '../../infrastructure/database/schema/schools.js';

export type SchoolRecord = typeof schools.$inferSelect;
export type CreateSchoolInput = { name: string; status: SchoolStatus };
export type UpdateSchoolInput = Partial<CreateSchoolInput>;
export type SchoolListInput = {
  page: number;
  limit: number;
  search?: string;
  status?: SchoolStatus;
};

@Injectable()
export class SchoolsRepository {
  constructor(private readonly database: DatabaseService) {}

  async create(input: CreateSchoolInput): Promise<SchoolRecord> {
    const [school] = await this.database.db
      .insert(schools)
      .values(input)
      .returning();
    return school;
  }

  async findById(id: string): Promise<SchoolRecord | undefined> {
    return this.database.db.query.schools.findFirst({
      where: eq(schools.id, id),
    });
  }

  async update(
    id: string,
    input: UpdateSchoolInput,
  ): Promise<SchoolRecord | undefined> {
    const [school] = await this.database.db
      .update(schools)
      .set({ ...input, updatedAt: new Date() })
      .where(eq(schools.id, id))
      .returning();
    return school;
  }

  async list(
    input: SchoolListInput,
  ): Promise<{ schools: SchoolRecord[]; total: number }> {
    const where = and(
      input.status ? eq(schools.status, input.status) : undefined,
      input.search ? ilike(schools.name, `%${input.search}%`) : undefined,
    );
    const [rows, totalRows] = await Promise.all([
      this.database.db
        .select()
        .from(schools)
        .where(where)
        .orderBy(desc(schools.createdAt), asc(schools.name))
        .limit(input.limit)
        .offset((input.page - 1) * input.limit),
      this.database.db.select({ value: count() }).from(schools).where(where),
    ]);
    return { schools: rows, total: totalRows[0]?.value ?? 0 };
  }
}
