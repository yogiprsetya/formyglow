CREATE TYPE "public"."day_of_week" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');--> statement-breakpoint
CREATE TYPE "public"."routine_frequency" AS ENUM('daily', 'weekly');--> statement-breakpoint
CREATE TYPE "public"."routine_type" AS ENUM('morning', 'evening', 'custom');--> statement-breakpoint
ALTER TABLE "routine_item" ALTER COLUMN "frequency" SET DEFAULT 'daily'::"public"."routine_frequency";--> statement-breakpoint
ALTER TABLE "routine_item" ALTER COLUMN "frequency" SET DATA TYPE "public"."routine_frequency" USING "frequency"::"public"."routine_frequency";--> statement-breakpoint
ALTER TABLE "routine" ALTER COLUMN "type" SET DEFAULT 'evening'::"public"."routine_type";--> statement-breakpoint
ALTER TABLE "routine" ALTER COLUMN "type" SET DATA TYPE "public"."routine_type" USING "type"::"public"."routine_type";--> statement-breakpoint
ALTER TABLE "routine_item" ADD COLUMN "repeat_on" "day_of_week"[];