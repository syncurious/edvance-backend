export const schoolStatuses = ['active', 'inactive'] as const;

export type SchoolStatus = (typeof schoolStatuses)[number];

export type School = {
  id: string;
  name: string;
  status: SchoolStatus;
  createdAt: string;
  updatedAt: string;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PaginatedResult<T> = { data: T[]; meta: PaginationMeta };
