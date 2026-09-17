import { Injectable } from '@nestjs/common';
import { ApplicationError } from '../../common/exceptions/application.error.js';
import type { CreateSchoolDto } from './dto/create-school.dto.js';
import type { SchoolQueryDto } from './dto/school-query.dto.js';
import type { UpdateSchoolDto } from './dto/update-school.dto.js';
import {
  SchoolsRepository,
  type CreateSchoolInput,
  type SchoolRecord,
  type UpdateSchoolInput,
} from './schools.repository.js';
import type { PaginatedResult, School } from './school.types.js';

@Injectable()
export class SchoolsService {
  constructor(private readonly schoolsRepository: SchoolsRepository) {}

  async create(input: CreateSchoolDto): Promise<School> {
    return this.toSchool(
      await this.schoolsRepository.create(this.toCreateInput(input)),
    );
  }

  async findOne(id: string): Promise<School> {
    return this.toSchool(await this.getRequired(id));
  }

  async update(id: string, input: UpdateSchoolDto): Promise<School> {
    await this.getRequired(id);
    const school = await this.schoolsRepository.update(
      id,
      this.toUpdateInput(input),
    );
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

  private toCreateInput(input: CreateSchoolDto): CreateSchoolInput {
    return {
      code: input.code.trim(),
      legalName: input.legalName.trim(),
      displayName: input.displayName.trim(),
      ownershipType: input.ownershipType,
      educationSystem: input.educationSystem,
      educationLevels: input.educationLevels,
      genderType: input.genderType,
      primaryEmail: input.primaryEmail.trim(),
      primaryPhone: input.primaryPhone.trim(),
      ...(input.websiteUrl !== undefined
        ? { websiteUrl: input.websiteUrl.trim() }
        : {}),
      ...(input.logoFileId !== undefined ? { logoFileId: input.logoFileId } : {}),
      ...(input.timezone !== undefined ? { timezone: input.timezone.trim() } : {}),
      ...(input.locale !== undefined ? { locale: input.locale.trim() } : {}),
      ...(input.currency !== undefined
        ? { currency: input.currency.trim() }
        : {}),
      status: input.status ?? 'trial',
    };
  }

  private toUpdateInput(input: UpdateSchoolDto): UpdateSchoolInput {
    return {
      ...(input.code !== undefined ? { code: input.code.trim() } : {}),
      ...(input.legalName !== undefined
        ? { legalName: input.legalName.trim() }
        : {}),
      ...(input.displayName !== undefined
        ? { displayName: input.displayName.trim() }
        : {}),
      ...(input.ownershipType !== undefined
        ? { ownershipType: input.ownershipType }
        : {}),
      ...(input.educationSystem !== undefined
        ? { educationSystem: input.educationSystem }
        : {}),
      ...(input.educationLevels !== undefined
        ? { educationLevels: input.educationLevels }
        : {}),
      ...(input.genderType !== undefined ? { genderType: input.genderType } : {}),
      ...(input.primaryEmail !== undefined
        ? { primaryEmail: input.primaryEmail.trim() }
        : {}),
      ...(input.primaryPhone !== undefined
        ? { primaryPhone: input.primaryPhone.trim() }
        : {}),
      ...(input.websiteUrl !== undefined
        ? { websiteUrl: input.websiteUrl.trim() }
        : {}),
      ...(input.logoFileId !== undefined ? { logoFileId: input.logoFileId } : {}),
      ...(input.timezone !== undefined ? { timezone: input.timezone.trim() } : {}),
      ...(input.locale !== undefined ? { locale: input.locale.trim() } : {}),
      ...(input.currency !== undefined
        ? { currency: input.currency.trim() }
        : {}),
      ...(input.status !== undefined ? { status: input.status } : {}),
    };
  }

  private async getRequired(id: string): Promise<SchoolRecord> {
    const school = await this.schoolsRepository.findById(id);
    if (!school) {
      throw new ApplicationError(
        'SCHOOL_NOT_FOUND',
        'School was not found.',
        404,
      );
    }
    return school;
  }

  private toSchool(record: SchoolRecord): School {
    return {
      id: record.id,
      code: record.code,
      legalName: record.legalName,
      displayName: record.displayName,
      ownershipType: record.ownershipType,
      educationSystem: record.educationSystem,
      educationLevels: record.educationLevels,
      genderType: record.genderType,
      primaryEmail: record.primaryEmail,
      primaryPhone: record.primaryPhone,
      websiteUrl: record.websiteUrl,
      logoFileId: record.logoFileId,
      timezone: record.timezone,
      locale: record.locale,
      currency: record.currency,
      status: record.status,
      onboardedAt: record.onboardedAt?.toISOString() ?? null,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString(),
      rowVersion: record.rowVersion,
    };
  }
}
