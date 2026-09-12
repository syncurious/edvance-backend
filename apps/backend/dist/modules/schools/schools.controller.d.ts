import { CreateSchoolDto } from './dto/create-school.dto.js';
import { SchoolQueryDto } from './dto/school-query.dto.js';
import { UpdateSchoolDto } from './dto/update-school.dto.js';
import { SchoolsService } from './schools.service.js';
export declare class SchoolsController {
    private readonly schoolsService;
    constructor(schoolsService: SchoolsService);
    create(input: CreateSchoolDto): Promise<{
        data: import("@evdance/types").School;
    }>;
    list(query: SchoolQueryDto): Promise<import("@evdance/types").PaginatedResult<import("@evdance/types").School>>;
    findOne(schoolId: string): Promise<{
        data: import("@evdance/types").School;
    }>;
    update(schoolId: string, input: UpdateSchoolDto): Promise<{
        data: import("@evdance/types").School;
    }>;
}
