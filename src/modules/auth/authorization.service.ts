import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import type { AuthenticatedUser } from './auth.types.js';
import { AuthorizationRepository } from './authorization.repository.js';
import type {
  AssignSystemRoleInput,
  AuthorizationScope,
  AuthorizationSession,
} from './authorization.types.js';

@Injectable()
export class AuthorizationService {
  constructor(private readonly repository: AuthorizationRepository) {}

  async getSession(user: AuthenticatedUser): Promise<AuthorizationSession> {
    await this.repository.upsertApplicationUser(user.id, user.email);
    const grants = await this.repository.listActiveGrants(user.id);
    return buildAuthorizationSession(user, grants);
  }

  async isPlatformSuperAdmin(userId: string): Promise<boolean> {
    const grants = await this.repository.listActiveGrants(userId);
    return grants.some(
      (grant) =>
        grant.scope === 'platform' && grant.roleCode === 'platform_super_admin',
    );
  }

  async assignSystemRole(input: AssignSystemRoleInput) {
    const role = await this.repository.findRole(input.roleCode);
    if (!role || !role.isSystem) {
      throw new BadRequestException('The requested system role is unavailable.');
    }

    const scope = role.scope as AuthorizationScope;
    const schoolId = input.schoolId ?? null;
    if (scope === 'platform' && schoolId !== null) {
      throw new BadRequestException('Platform roles cannot be assigned to a school.');
    }
    if (scope === 'school' && schoolId === null) {
      throw new BadRequestException('A school is required for this role.');
    }
    if (schoolId !== null && !(await this.repository.schoolExists(schoolId))) {
      throw new NotFoundException('School was not found.');
    }

    await this.repository.upsertApplicationUser(input.userId, input.email ?? null);
    let membership = await this.repository.findMembership(
      input.userId,
      scope,
      schoolId,
    );
    if (!membership) {
      membership = await this.repository.createMembership(
        input.userId,
        scope,
        schoolId,
      );
    }
    if (!membership) {
      membership = await this.repository.findMembership(
        input.userId,
        scope,
        schoolId,
      );
    }
    if (!membership) {
      throw new BadRequestException('Unable to create the role membership.');
    }
    await this.repository.assignRole(membership.id, role.id);

    return {
      membershipId: membership.id,
      userId: input.userId,
      roleCode: role.code,
      scope,
      schoolId,
    };
  }
}

function buildAuthorizationSession(
  user: AuthenticatedUser,
  grants: Awaited<ReturnType<AuthorizationRepository['listActiveGrants']>>,
): AuthorizationSession {
  const byMembership = new Map<
    string,
    AuthorizationSession['memberships'][number]
  >();

  for (const grant of grants) {
    let membership = byMembership.get(grant.membershipId);
    if (!membership) {
      membership = {
        id: grant.membershipId,
        scope: grant.scope,
        school:
          grant.schoolId && grant.schoolDisplayName
            ? { id: grant.schoolId, displayName: grant.schoolDisplayName }
            : null,
        roles: [],
        permissions: [],
      };
      byMembership.set(grant.membershipId, membership);
    }
    if (grant.roleCode && !membership.roles.includes(grant.roleCode)) {
      membership.roles.push(grant.roleCode);
    }
    if (
      grant.permissionCode &&
      !membership.permissions.includes(grant.permissionCode)
    ) {
      membership.permissions.push(grant.permissionCode);
    }
  }

  const memberships = [...byMembership.values()];
  const platformMemberships = memberships.filter(
    (membership) => membership.scope === 'platform',
  );
  return {
    user,
    platform: {
      roles: unique(platformMemberships.flatMap((membership) => membership.roles)),
      permissions: unique(
        platformMemberships.flatMap((membership) => membership.permissions),
      ),
    },
    memberships,
  };
}

function unique(values: string[]): string[] {
  return [...new Set(values)].sort();
}
