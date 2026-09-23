CREATE TYPE "public"."authorization_scope" AS ENUM('platform', 'school', 'campus');--> statement-breakpoint
CREATE TYPE "public"."membership_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TABLE "application_users" (
  "id" uuid PRIMARY KEY NOT NULL,
  "email" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "roles" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "code" text NOT NULL,
  "name" text NOT NULL,
  "scope" "authorization_scope" NOT NULL,
  "is_system" boolean DEFAULT false NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT "roles_code_not_blank" CHECK (btrim("code") <> ''),
  CONSTRAINT "roles_name_not_blank" CHECK (btrim("name") <> '')
);--> statement-breakpoint
CREATE TABLE "permissions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "code" text NOT NULL,
  "description" text NOT NULL,
  CONSTRAINT "permissions_code_not_blank" CHECK (btrim("code") <> '')
);--> statement-breakpoint
CREATE TABLE "role_permissions" (
  "role_id" uuid NOT NULL REFERENCES "roles"("id") ON DELETE CASCADE,
  "permission_id" uuid NOT NULL REFERENCES "permissions"("id") ON DELETE CASCADE,
  CONSTRAINT "role_permissions_role_id_permission_id_pk" PRIMARY KEY("role_id", "permission_id")
);--> statement-breakpoint
CREATE TABLE "memberships" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "application_users"("id") ON DELETE CASCADE,
  "school_id" uuid REFERENCES "schools"("id") ON DELETE CASCADE,
  "scope" "authorization_scope" NOT NULL,
  "status" "membership_status" DEFAULT 'active' NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT "memberships_scope_school_consistency" CHECK (("scope" = 'platform' AND "school_id" IS NULL) OR ("scope" IN ('school', 'campus') AND "school_id" IS NOT NULL))
);--> statement-breakpoint
CREATE TABLE "membership_roles" (
  "membership_id" uuid NOT NULL REFERENCES "memberships"("id") ON DELETE CASCADE,
  "role_id" uuid NOT NULL REFERENCES "roles"("id") ON DELETE RESTRICT,
  CONSTRAINT "membership_roles_membership_id_role_id_pk" PRIMARY KEY("membership_id", "role_id")
);--> statement-breakpoint
CREATE UNIQUE INDEX "roles_code_unique_idx" ON "roles" USING btree ("code");--> statement-breakpoint
CREATE UNIQUE INDEX "permissions_code_unique_idx" ON "permissions" USING btree ("code");--> statement-breakpoint
CREATE INDEX "memberships_user_id_idx" ON "memberships" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "memberships_school_id_idx" ON "memberships" USING btree ("school_id");--> statement-breakpoint
CREATE UNIQUE INDEX "memberships_platform_user_unique_idx" ON "memberships" USING btree ("user_id") WHERE "scope" = 'platform';--> statement-breakpoint
CREATE UNIQUE INDEX "memberships_school_user_unique_idx" ON "memberships" USING btree ("user_id", "school_id") WHERE "scope" = 'school';--> statement-breakpoint
INSERT INTO "permissions" ("code", "description") VALUES
  ('platform.manage', 'Manage platform-wide schools, access, and settings.'),
  ('school.manage', 'Manage the assigned school and its administration.')
ON CONFLICT ("code") DO NOTHING;--> statement-breakpoint
INSERT INTO "roles" ("code", "name", "scope", "is_system") VALUES
  ('platform_super_admin', 'Platform Super Admin', 'platform', true),
  ('school_admin', 'School Admin', 'school', true)
ON CONFLICT ("code") DO NOTHING;--> statement-breakpoint
INSERT INTO "role_permissions" ("role_id", "permission_id")
SELECT roles.id, permissions.id
FROM "roles"
JOIN "permissions" ON (roles.code = 'platform_super_admin' AND permissions.code = 'platform.manage')
  OR (roles.code = 'school_admin' AND permissions.code = 'school.manage')
ON CONFLICT DO NOTHING;
