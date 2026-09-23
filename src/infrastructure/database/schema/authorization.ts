import { sql } from 'drizzle-orm';
import {
  boolean,
  check,
  index,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';
import { schools } from './schools.js';

export const authorizationScope = pgEnum('authorization_scope', [
  'platform',
  'school',
  'campus',
]);
export const membershipStatus = pgEnum('membership_status', [
  'active',
  'inactive',
]);

/** Application identity; its ID is the Supabase auth.users UUID. */
export const applicationUsers = pgTable('application_users', {
  id: uuid('id').primaryKey(),
  email: text('email'),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
    .notNull()
    .defaultNow(),
});

export const roles = pgTable(
  'roles',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    code: text('code').notNull(),
    name: text('name').notNull(),
    scope: authorizationScope('scope').notNull(),
    isSystem: boolean('is_system').notNull().default(false),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('roles_code_unique_idx').on(table.code),
    check('roles_code_not_blank', sql`btrim(${table.code}) <> ''`),
    check('roles_name_not_blank', sql`btrim(${table.name}) <> ''`),
  ],
);

export const permissions = pgTable(
  'permissions',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    code: text('code').notNull(),
    description: text('description').notNull(),
  },
  (table) => [
    uniqueIndex('permissions_code_unique_idx').on(table.code),
    check('permissions_code_not_blank', sql`btrim(${table.code}) <> ''`),
  ],
);

export const rolePermissions = pgTable(
  'role_permissions',
  {
    roleId: uuid('role_id')
      .notNull()
      .references(() => roles.id, { onDelete: 'cascade' }),
    permissionId: uuid('permission_id')
      .notNull()
      .references(() => permissions.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.roleId, table.permissionId] })],
);

export const memberships = pgTable(
  'memberships',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => applicationUsers.id, { onDelete: 'cascade' }),
    schoolId: uuid('school_id').references(() => schools.id, {
      onDelete: 'cascade',
    }),
    scope: authorizationScope('scope').notNull(),
    status: membershipStatus('status').notNull().default('active'),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index('memberships_user_id_idx').on(table.userId),
    index('memberships_school_id_idx').on(table.schoolId),
    uniqueIndex('memberships_platform_user_unique_idx')
      .on(table.userId)
      .where(sql`${table.scope} = 'platform'`),
    uniqueIndex('memberships_school_user_unique_idx')
      .on(table.userId, table.schoolId)
      .where(sql`${table.scope} = 'school'`),
    check(
      'memberships_scope_school_consistency',
      sql`(${table.scope} = 'platform' AND ${table.schoolId} IS NULL) OR (${table.scope} IN ('school', 'campus') AND ${table.schoolId} IS NOT NULL)`,
    ),
  ],
);

export const membershipRoles = pgTable(
  'membership_roles',
  {
    membershipId: uuid('membership_id')
      .notNull()
      .references(() => memberships.id, { onDelete: 'cascade' }),
    roleId: uuid('role_id')
      .notNull()
      .references(() => roles.id, { onDelete: 'restrict' }),
  },
  (table) => [primaryKey({ columns: [table.membershipId, table.roleId] })],
);
