import { Injectable } from '@nestjs/common';
import type { PaginatedResult, School } from '@evdance/types';
import { ApplicationError } from '../../common/exceptions/application.error.js';
import type { CreateSchoolDto } from './dto/create-school.dto.js';
import type { SchoolQueryDto } from './dto/school-query.dto.js';
import type { UpdateSchoolDto } from './dto/update-school.dto.js';
import { SchoolsRepository, type SchoolRecord } from './schools.repository.js';

@Injectable()
export class SchoolsService {
  constructor(private readonly schoolsRepository: SchoolsRepository) {}
  async create(input: CreateSchoolDto): Promise<School> {
    return this.toSchool(
      await this.schoolsRepository.create({
        name: input.name.trim(),
        status: input.status ?? 'active',
      }),
    );
  }
  async findOne(id: string): Promise<School> {
    return this.toSchool(await this.getRequired(id));
  }
  async update(id: string, input: UpdateSchoolDto): Promise<School> {
    await this.getRequired(id);
    const school = await this.schoolsRepository.update(id, {
      ...(input.name !== undefined ? { name: input.name.trim() } : {}),
      ...(input.status !== undefined ? { status: input.status } : {}),
    });
    return this.toSchool(school!);
  }
  async list(query: SchoolQueryDto): Promise<PaginatedResult<School>> {
    const result = await this.schoolsRepository.list(query);
    return {
      data: result.schools.map((school) => this.toSchool(school)),
      meta: {
        page: query.page,
        limit: query.limit,
        total: result.total,
        totalPages: Math.ceil(result.total / query.limit),
      },
    };
  }
  private async getRequired(id: string): Promise<SchoolRecord> {
    const school = await this.schoolsRepository.findById(id);
    if (!school)
      throw new ApplicationError(
        'SCHOOL_NOT_FOUND',
        'School was not found.',
        404,
      );
    return school;
  }
  private toSchool(record: SchoolRecord): School {
    return {
      id: record.id,
      name: record.name,
      status: record.status,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString(),
    };
  }
}
