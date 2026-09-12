import type { PaginatedResult, School } from '@evdance/types';
import type { CreateSchoolDto } from './dto/create-school.dto.js';
import type { SchoolQueryDto } from './dto/school-query.dto.js';
import type { UpdateSchoolDto } from './dto/update-school.dto.js';
import { SchoolsRepository } from './schools.repository.js';
export declare class SchoolsService {
    private readonly schoolsRepository;
    constructor(schoolsRepository: SchoolsRepository);
    create(input: CreateSchoolDto): Promise<School>;
    findOne(id: string): Promise<School>;
    update(id: string, input: UpdateSchoolDto): Promise<School>;
    list(query: SchoolQueryDto): Promise<PaginatedResult<School>>;
    private getRequired;
    private toSchool;
}
