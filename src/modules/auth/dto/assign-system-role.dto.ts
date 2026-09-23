import { IsEmail, IsIn, IsOptional, IsUUID, ValidateIf } from 'class-validator';

export class AssignSystemRoleDto {
  @IsUUID()
  userId!: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsIn(['platform_super_admin', 'school_admin'])
  roleCode!: 'platform_super_admin' | 'school_admin';

  @ValidateIf((value: AssignSystemRoleDto) => value.roleCode === 'school_admin')
  @IsUUID()
  schoolId?: string;
}
