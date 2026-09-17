CREATE EXTENSION IF NOT EXISTS pgcrypto;--> statement-breakpoint
CREATE EXTENSION IF NOT EXISTS citext;--> statement-breakpoint
DROP INDEX IF EXISTS "schools_status_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "schools_created_at_idx";--> statement-breakpoint
CREATE TYPE "public"."school_education_level" AS ENUM('pre_primary', 'primary', 'elementary', 'secondary', 'higher_secondary', 'o_level', 'a_level');--> statement-breakpoint
CREATE TYPE "public"."school_education_system" AS ENUM('sindh_board', 'cambridge', 'ib', 'edexcel', 'mixed', 'other');--> statement-breakpoint
CREATE TYPE "public"."school_gender_type" AS ENUM('coeducation', 'boys', 'girls');--> statement-breakpoint
CREATE TYPE "public"."school_ownership_type" AS ENUM('private', 'public', 'trust', 'ngo', 'other');--> statement-breakpoint
CREATE TYPE "public"."school_status_next" AS ENUM('trial', 'active', 'past_due', 'suspended', 'closed');--> statement-breakpoint
ALTER TABLE "schools" ALTER COLUMN "status" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "schools" ALTER COLUMN "status" TYPE "public"."school_status_next" USING (CASE WHEN "status"::text = 'inactive' THEN 'suspended' ELSE "status"::text END)::"public"."school_status_next";--> statement-breakpoint
DROP TYPE "public"."school_status";--> statement-breakpoint
ALTER TYPE "public"."school_status_next" RENAME TO "school_status";--> statement-breakpoint
ALTER TABLE "schools"
  ADD COLUMN "code" citext,
  ADD COLUMN "legal_name" text,
  ADD COLUMN "display_name" text,
  ADD COLUMN "ownership_type" "public"."school_ownership_type",
  ADD COLUMN "education_system" "public"."school_education_system",
  ADD COLUMN "education_level" "public"."school_education_level"[],
  ADD COLUMN "gender_type" "public"."school_gender_type",
  ADD COLUMN "primary_email" citext,
  ADD COLUMN "primary_phone" varchar(16),
  ADD COLUMN "website_url" text,
  ADD COLUMN "logo_file_id" uuid,
  ADD COLUMN "timezone" text,
  ADD COLUMN "locale" text,
  ADD COLUMN "currency" char(3),
  ADD COLUMN "onboarded_at" timestamp with time zone,
  ADD COLUMN "created_by" uuid,
  ADD COLUMN "updated_by" uuid,
  ADD COLUMN "row_version" integer;--> statement-breakpoint
UPDATE "schools"
SET
  "code" = 'school-' || replace("id"::text, '-', ''),
  "legal_name" = "name",
  "display_name" = "name",
  "ownership_type" = 'other',
  "education_system" = 'other',
  "education_level" = ARRAY['primary']::"public"."school_education_level"[],
  "gender_type" = 'coeducation',
  "primary_email" = 'legacy-' || replace("id"::text, '-', '') || '@invalid.local',
  "primary_phone" = '+923001234567',
  "timezone" = 'Asia/Karachi',
  "locale" = 'en-PK',
  "currency" = 'PKR',
  "row_version" = 1;--> statement-breakpoint
ALTER TABLE "schools"
  ALTER COLUMN "code" SET NOT NULL,
  ALTER COLUMN "legal_name" SET NOT NULL,
  ALTER COLUMN "display_name" SET NOT NULL,
  ALTER COLUMN "ownership_type" SET NOT NULL,
  ALTER COLUMN "education_system" SET NOT NULL,
  ALTER COLUMN "education_level" SET NOT NULL,
  ALTER COLUMN "gender_type" SET NOT NULL,
  ALTER COLUMN "primary_email" SET NOT NULL,
  ALTER COLUMN "primary_phone" SET NOT NULL,
  ALTER COLUMN "timezone" SET DEFAULT 'Asia/Karachi',
  ALTER COLUMN "timezone" SET NOT NULL,
  ALTER COLUMN "locale" SET DEFAULT 'en-PK',
  ALTER COLUMN "locale" SET NOT NULL,
  ALTER COLUMN "currency" SET DEFAULT 'PKR',
  ALTER COLUMN "currency" SET NOT NULL,
  ALTER COLUMN "status" SET DEFAULT 'trial',
  ALTER COLUMN "row_version" SET DEFAULT 1,
  ALTER COLUMN "row_version" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "schools" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "schools"
  ADD CONSTRAINT "schools_code_not_blank" CHECK (btrim("code") <> ''),
  ADD CONSTRAINT "schools_legal_name_not_blank" CHECK (btrim("legal_name") <> ''),
  ADD CONSTRAINT "schools_display_name_not_blank" CHECK (btrim("display_name") <> ''),
  ADD CONSTRAINT "schools_education_level_not_empty" CHECK (cardinality("education_level") > 0),
  ADD CONSTRAINT "schools_primary_phone_e164" CHECK ("primary_phone" ~ '^\\+[1-9][0-9]{6,14}$'),
  ADD CONSTRAINT "schools_website_url_https" CHECK ("website_url" IS NULL OR "website_url" ~ '^https://');--> statement-breakpoint
CREATE UNIQUE INDEX "schools_code_unique_idx" ON "schools" USING btree ("code");--> statement-breakpoint
CREATE UNIQUE INDEX "schools_primary_email_unique_idx" ON "schools" USING btree ("primary_email");--> statement-breakpoint
CREATE INDEX "schools_status_idx" ON "schools" USING btree ("status");--> statement-breakpoint
CREATE INDEX "schools_created_at_idx" ON "schools" USING btree ("created_at");
