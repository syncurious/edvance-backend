ALTER TABLE "schools" DROP CONSTRAINT "schools_primary_phone_e164";--> statement-breakpoint
ALTER TABLE "schools"
  ADD CONSTRAINT "schools_primary_phone_e164"
  CHECK ("primary_phone" ~ '^\+[1-9][0-9]{6,14}$');
