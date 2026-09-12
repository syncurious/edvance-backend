import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { schoolStatuses, type SchoolStatus } from '@evdance/types';

export class CreateSchoolDto {
  @ApiProperty({ example: 'Evdance Grammar School' })
  @IsString()
  @MinLength(1)
  @MaxLength(160)
  @Matches(/\S/, {
    message: 'name must contain at least one non-whitespace character',
  })
  name!: string;

  @ApiPropertyOptional({ enum: schoolStatuses, default: 'active' })
  @IsOptional()
  @IsEnum(schoolStatuses)
  status?: SchoolStatus;
}
