import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Matches,
} from 'class-validator';
import {
  schoolEducationLevels,
  schoolEducationSystems,
  schoolGenderTypes,
  schoolOwnershipTypes,
  schoolStatuses,
  type SchoolEducationLevel,
  type SchoolEducationSystem,
  type SchoolGenderType,
  type SchoolOwnershipType,
  type SchoolStatus,
} from '../school.types.js';

const nonBlank = /\S/;
const e164Phone = /^\+[1-9]\d{6,14}$/;
const currencyCode = /^[A-Z]{3}$/;

export class CreateSchoolDto {
  @ApiProperty({ example: 'evdance-grammar' })
  @IsString()
  @Matches(nonBlank)
  code!: string;

  @ApiProperty({ example: 'Evdance Grammar School (Private) Limited' })
  @IsString()
  @Matches(nonBlank)
  legalName!: string;

  @ApiProperty({ example: 'Evdance Grammar School' })
  @IsString()
  @Matches(nonBlank)
  displayName!: string;

  @ApiProperty({ enum: schoolOwnershipTypes })
  @IsEnum(schoolOwnershipTypes)
  ownershipType!: SchoolOwnershipType;

  @ApiProperty({ enum: schoolEducationSystems })
  @IsEnum(schoolEducationSystems)
  educationSystem!: SchoolEducationSystem;

  @ApiProperty({ enum: schoolEducationLevels, isArray: true })
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(schoolEducationLevels, { each: true })
  educationLevels!: SchoolEducationLevel[];

  @ApiProperty({ enum: schoolGenderTypes })
  @IsEnum(schoolGenderTypes)
  genderType!: SchoolGenderType;

  @ApiProperty({ example: 'admin@evdance.edu.pk' })
  @IsEmail()
  primaryEmail!: string;

  @ApiProperty({ example: '+923001234567' })
  @Matches(e164Phone, { message: 'primaryPhone must be an E.164 phone number' })
  primaryPhone!: string;

  @ApiPropertyOptional({ example: 'https://www.evdance.edu.pk' })
  @IsOptional()
  @IsUrl({ protocols: ['https'], require_protocol: true })
  websiteUrl?: string;

  @ApiPropertyOptional({ format: 'uuid' })
  @IsOptional()
  @IsUUID()
  logoFileId?: string;

  @ApiPropertyOptional({ default: 'Asia/Karachi' })
  @IsOptional()
  @IsString()
  @Matches(nonBlank)
  timezone?: string;

  @ApiPropertyOptional({ default: 'en-PK' })
  @IsOptional()
  @IsString()
  @Matches(nonBlank)
  locale?: string;

  @ApiPropertyOptional({ default: 'PKR', example: 'PKR' })
  @IsOptional()
  @Matches(currencyCode)
  currency?: string;

  @ApiPropertyOptional({ enum: schoolStatuses, default: 'trial' })
  @IsOptional()
  @IsEnum(schoolStatuses)
  status?: SchoolStatus;
}
