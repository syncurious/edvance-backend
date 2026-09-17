import { sql } from 'drizzle-orm';
import {
  check,
  char,
  customType,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

const citext = customType<{ data: string }>({ dataType: () => 'citext' });

export const schoolOwnershipType = pgEnum('school_ownership_type', [
  'private',
  'public',
  'trust',
  'ngo',
  'other',
]);
export const schoolEducationSystem = pgEnum('school_education_system', [
  'sindh_board',
  'cambridge',
  'ib',
  'edexcel',
  'mixed',
  'other',
]);
export const schoolEducationLevel = pgEnum('school_education_level', [
  'pre_primary',
  'primary',
  'elementary',
  'secondary',
  'higher_secondary',
  'o_level',
  'a_level',
]);
export const schoolGenderType = pgEnum('school_gender_type', [
  'coeducation',
  'boys',
  'girls',
]);
export const schoolStatus = pgEnum('school_status', [
  'trial',
  'active',
  'past_due',
  'suspended',
  'closed',
]);

export const schools = pgTable(
  'schools',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    code: citext('code').notNull(),
    legalName: text('legal_name').notNull(),
    displayName: text('display_name').notNull(),
    ownershipType: schoolOwnershipType('ownership_type').notNull(),
    educationSystem: schoolEducationSystem('education_system').notNull(),
    educationLevels: schoolEducationLevel('education_level').array().notNull(),
    genderType: schoolGenderType('gender_type').notNull(),
    primaryEmail: citext('primary_email').notNull(),
    primaryPhone: varchar('primary_phone', { length: 16 }).notNull(),
    websiteUrl: text('website_url'),
    logoFileId: uuid('logo_file_id'),
    timezone: text('timezone').notNull().default('Asia/Karachi'),
    locale: text('locale').notNull().default('en-PK'),
    currency: char('currency', { length: 3 }).notNull().default('PKR'),
    status: schoolStatus('status').notNull().default('trial'),
    onboardedAt: timestamp('onboarded_at', { withTimezone: true, mode: 'date' }),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
      .notNull()
      .defaultNow(),
    createdBy: uuid('created_by'),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
      .notNull()
      .defaultNow(),
    updatedBy: uuid('updated_by'),
    rowVersion: integer('row_version').notNull().default(1),
  },
  (table) => [
    uniqueIndex('schools_code_unique_idx').on(table.code),
    uniqueIndex('schools_primary_email_unique_idx').on(table.primaryEmail),
    index('schools_status_idx').on(table.status),
    index('schools_created_at_idx').on(table.createdAt),
    check('schools_code_not_blank', sql`btrim(${table.code}) <> ''`),
    check('schools_legal_name_not_blank', sql`btrim(${table.legalName}) <> ''`),
    check(
      'schools_display_name_not_blank',
      sql`btrim(${table.displayName}) <> ''`,
    ),
    check(
      'schools_education_level_not_empty',
      sql`cardinality(${table.educationLevels}) > 0`,
    ),
    check(
      'schools_primary_phone_e164',
      sql`${table.primaryPhone} ~ '^\\+[1-9][0-9]{6,14}$'`,
    ),
    check(
      'schools_website_url_https',
      sql`${table.websiteUrl} IS NULL OR ${table.websiteUrl} ~ '^https://'`,
    ),
  ],
);
