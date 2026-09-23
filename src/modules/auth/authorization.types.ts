export type AuthorizationScope = 'platform' | 'school' | 'campus';

export type AuthorizationSession = {
  user: { id: string; email: string | null };
  platform: { roles: string[]; permissions: string[] };
  memberships: Array<{
    id: string;
    scope: AuthorizationScope;
    school: { id: string; displayName: string } | null;
    roles: string[];
    permissions: string[];
  }>;
};

export type AssignSystemRoleInput = {
  userId: string;
  email?: string;
  roleCode: 'platform_super_admin' | 'school_admin';
  schoolId?: string;
};
