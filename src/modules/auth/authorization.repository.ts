import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { DatabaseService } from '../../infrastructure/database/database.service.js';
import {
  applicationUsers,
  membershipRoles,
  memberships,
  permissions,
  rolePermissions,
  roles,
} from '../../infrastructure/database/schema/authorization.js';
import { schools } from '../../infrastructure/database/schema/schools.js';
import type { AuthorizationScope } from './authorization.types.js';

export type MembershipGrant = {
  membershipId: string;
  scope: AuthorizationScope;
  schoolId: string | null;
  schoolDisplayName: string | null;
  roleCode: string | null;
  permissionCode: string | null;
};

@Injectable()
export class AuthorizationRepository {
  constructor(private readonly database: DatabaseService) {}

  async upsertApplicationUser(id: string, email: string | null): Promise<void> {
    await this.database.db
      .insert(applicationUsers)
      .values({ id, email })
      .onConflictDoUpdate({
        target: applicationUsers.id,
        set: { email, updatedAt: new Date() },
      });
  }

  async listActiveGrants(userId: string): Promise<MembershipGrant[]> {
    return this.database.db
      .select({
        membershipId: memberships.id,
        scope: memberships.scope,
        schoolId: schools.id,
        schoolDisplayName: schools.displayName,
        roleCode: roles.code,
        permissionCode: permissions.code,
      })
      .from(memberships)
      .leftJoin(schools, eq(memberships.schoolId, schools.id))
      .leftJoin(membershipRoles, eq(membershipRoles.membershipId, memberships.id))
      .leftJoin(roles, eq(membershipRoles.roleId, roles.id))
      .leftJoin(rolePermissions, eq(rolePermissions.roleId, roles.id))
      .leftJoin(permissions, eq(rolePermissions.permissionId, permissions.id))
      .where(and(eq(memberships.userId, userId), eq(memberships.status, 'active')));
  }

  async findRole(code: string) {
    return this.database.db.query.roles.findFirst({ where: eq(roles.code, code) });
  }

  async schoolExists(id: string): Promise<boolean> {
    const school = await this.database.db.query.schools.findFirst({
      columns: { id: true },
      where: eq(schools.id, id),
    });
    return Boolean(school);
  }

  async findMembership(
    userId: string,
    scope: AuthorizationScope,
    schoolId: string | null,
  ) {
    return this.database.db.query.memberships.findFirst({
      where:
        schoolId === null
          ? and(
              eq(memberships.userId, userId),
              eq(memberships.scope, scope),
            )
          : and(
              eq(memberships.userId, userId),
              eq(memberships.scope, scope),
              eq(memberships.schoolId, schoolId),
            ),
    });
  }

  async createMembership(
    userId: string,
    scope: AuthorizationScope,
    schoolId: string | null,
  ) {
    const [membership] = await this.database.db
      .insert(memberships)
      .values({ userId, scope, schoolId })
      .onConflictDoNothing()
      .returning();
    return membership;
  }

  async assignRole(membershipId: string, roleId: string): Promise<void> {
    await this.database.db
      .insert(membershipRoles)
      .values({ membershipId, roleId })
      .onConflictDoNothing();
  }
}
