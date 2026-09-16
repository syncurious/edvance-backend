import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SuperAdminGuard } from '../../common/guards/super-admin.guard.js';
import { CreateSchoolDto } from './dto/create-school.dto.js';
import { SchoolQueryDto } from './dto/school-query.dto.js';
import { UpdateSchoolDto } from './dto/update-school.dto.js';
import { SchoolsService } from './schools.service.js';

@ApiTags('schools')
@ApiBearerAuth()
@UseGuards(SuperAdminGuard)
@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Post()
  @ApiCreatedResponse({ description: 'School created.' })
  async create(@Body() input: CreateSchoolDto) {
    return { data: await this.schoolsService.create(input) };
  }

  @Get()
  @ApiOkResponse({ description: 'Paginated schools.' })
  async list(@Query() query: SchoolQueryDto) {
    return this.schoolsService.list(query);
  }

  @Get(':schoolId')
  @ApiOkResponse({ description: 'School found.' })
  async findOne(@Param('schoolId', new ParseUUIDPipe()) schoolId: string) {
    return { data: await this.schoolsService.findOne(schoolId) };
  }

  @Patch(':schoolId')
  @ApiOkResponse({ description: 'School updated.' })
  async update(
    @Param('schoolId', new ParseUUIDPipe()) schoolId: string,
    @Body() input: UpdateSchoolDto,
  ) {
    return { data: await this.schoolsService.update(schoolId, input) };
  }
}
