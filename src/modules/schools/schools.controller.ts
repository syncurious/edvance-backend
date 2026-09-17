import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateSchoolDto } from './dto/create-school.dto.js';
import { SchoolQueryDto } from './dto/school-query.dto.js';
import { UpdateSchoolDto } from './dto/update-school.dto.js';
import { SchoolsService } from './schools.service.js';

@ApiTags('schools')
@ApiBearerAuth()
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

  @Get(':id')
  @ApiOkResponse({ description: 'School found.' })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return { data: await this.schoolsService.findOne(id) };
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'School updated.' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() input: UpdateSchoolDto,
  ) {
    return { data: await this.schoolsService.update(id, input) };
  }
}
