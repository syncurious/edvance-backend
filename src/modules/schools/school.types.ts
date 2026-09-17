export const schoolOwnershipTypes = [
  'private',
  'public',
  'trust',
  'ngo',
  'other',
] as const;
export const schoolEducationSystems = [
  'sindh_board',
  'cambridge',
  'ib',
  'edexcel',
  'mixed',
  'other',
] as const;
export const schoolEducationLevels = [
  'pre_primary',
  'primary',
  'elementary',
  'secondary',
  'higher_secondary',
  'o_level',
  'a_level',
] as const;
export const schoolGenderTypes = ['coeducation', 'boys', 'girls'] as const;
export const schoolStatuses = [
  'trial',
  'active',
  'past_due',
  'suspended',
  'closed',
] as const;

export type SchoolOwnershipType = (typeof schoolOwnershipTypes)[number];
export type SchoolEducationSystem = (typeof schoolEducationSystems)[number];
export type SchoolEducationLevel = (typeof schoolEducationLevels)[number];
export type SchoolGenderType = (typeof schoolGenderTypes)[number];
export type SchoolStatus = (typeof schoolStatuses)[number];

export type School = {
  id: string;
  code: string;
  legalName: string;
  displayName: string;
  ownershipType: SchoolOwnershipType;
  educationSystem: SchoolEducationSystem;
  educationLevels: SchoolEducationLevel[];
  genderType: SchoolGenderType;
  primaryEmail: string;
  primaryPhone: string;
  websiteUrl: string | null;
  logoFileId: string | null;
  timezone: string;
  locale: string;
  currency: string;
  status: SchoolStatus;
  onboardedAt: string | null;
  createdAt: string;
  updatedAt: string;
  rowVersion: number;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PaginatedResult<T> = { data: T[]; meta: PaginationMeta };
