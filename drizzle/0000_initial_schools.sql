CREATE TYPE "public"."school_status" AS ENUM('active', 'inactive');

CREATE TABLE "schools" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" varchar(160) NOT NULL,
  "status" "school_status" DEFAULT 'active' NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX "schools_status_idx" ON "schools" USING btree ("status");
CREATE INDEX "schools_created_at_idx" ON "schools" USING btree ("created_at");
