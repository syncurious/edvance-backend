import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AuthorizationService } from './authorization.service.js';
import type { AuthorizationRepository } from './authorization.repository.js';

describe('AuthorizationService', () => {
  const upsertApplicationUser = jest.fn();
  const listActiveGrants = jest.fn();
  const findRole = jest.fn();
  const schoolExists = jest.fn();
  const findMembership = jest.fn();
  const createMembership = jest.fn();
  const assignRole = jest.fn();
  const repository = {
    upsertApplicationUser,
    listActiveGrants,
    findRole,
    schoolExists,
    findMembership,
    createMembership,
    assignRole,
  } as unknown as AuthorizationRepository;
  let service: AuthorizationService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AuthorizationService(repository);
  });

  it('builds a deduplicated authorization session from active grants', async () => {
    listActiveGrants.mockResolvedValue([
      {
        membershipId: 'platform-membership',
        scope: 'platform',
        schoolId: null,
        schoolDisplayName: null,
        roleCode: 'platform_super_admin',
        permissionCode: 'platform.manage',
      },
      {
        membershipId: 'school-membership',
        scope: 'school',
        schoolId: 'school-id',
        schoolDisplayName: 'Evdance School',
        roleCode: 'school_admin',
        permissionCode: 'school.manage',
      },
    ]);

    await expect(
      service.getSession({ id: 'user-id', email: 'admin@evdance.test' }),
    ).resolves.toEqual({
      user: { id: 'user-id', email: 'admin@evdance.test' },
      platform: {
        roles: ['platform_super_admin'],
        permissions: ['platform.manage'],
      },
      memberships: [
        {
          id: 'platform-membership',
          scope: 'platform',
          school: null,
          roles: ['platform_super_admin'],
          permissions: ['platform.manage'],
        },
        {
          id: 'school-membership',
          scope: 'school',
          school: { id: 'school-id', displayName: 'Evdance School' },
          roles: ['school_admin'],
          permissions: ['school.manage'],
        },
      ],
    });
  });

  it('assigns a School Admin role to an existing school', async () => {
    findRole.mockResolvedValue({
      id: 'role-id',
      code: 'school_admin',
      scope: 'school',
      isSystem: true,
    });
    schoolExists.mockResolvedValue(true);
    findMembership.mockResolvedValue(undefined);
    createMembership.mockResolvedValue({ id: 'membership-id' });

    await expect(
      service.assignSystemRole({
        userId: 'user-id',
        roleCode: 'school_admin',
        schoolId: 'school-id',
      }),
    ).resolves.toEqual({
      membershipId: 'membership-id',
      userId: 'user-id',
      roleCode: 'school_admin',
      scope: 'school',
      schoolId: 'school-id',
    });
    expect(assignRole).toHaveBeenCalledWith('membership-id', 'role-id');
  });

  it('rejects a School Admin role without a school', async () => {
    findRole.mockResolvedValue({
      id: 'role-id',
      code: 'school_admin',
      scope: 'school',
      isSystem: true,
    });

    await expect(
      service.assignSystemRole({ userId: 'user-id', roleCode: 'school_admin' }),
    ).rejects.toThrow(BadRequestException);
  });

  it('rejects a School Admin role for an unknown school', async () => {
    findRole.mockResolvedValue({
      id: 'role-id',
      code: 'school_admin',
      scope: 'school',
      isSystem: true,
    });
    schoolExists.mockResolvedValue(false);

    await expect(
      service.assignSystemRole({
        userId: 'user-id',
        roleCode: 'school_admin',
        schoolId: 'missing-school',
      }),
    ).rejects.toThrow(NotFoundException);
  });
});
