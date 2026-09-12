var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, Matches, MaxLength, MinLength, } from 'class-validator';
import { schoolStatuses } from '@evdance/types';
export class CreateSchoolDto {
    name;
    status;
}
__decorate([
    ApiProperty({ example: 'Evdance Grammar School' }),
    IsString(),
    MinLength(1),
    MaxLength(160),
    Matches(/\S/, {
        message: 'name must contain at least one non-whitespace character',
    }),
    __metadata("design:type", String)
], CreateSchoolDto.prototype, "name", void 0);
__decorate([
    ApiPropertyOptional({ enum: schoolStatuses, default: 'active' }),
    IsOptional(),
    IsEnum(schoolStatuses),
    __metadata("design:type", String)
], CreateSchoolDto.prototype, "status", void 0);
//# sourceMappingURL=create-school.dto.js.map