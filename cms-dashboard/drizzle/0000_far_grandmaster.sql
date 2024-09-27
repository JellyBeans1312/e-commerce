DO $$ BEGIN
 CREATE TYPE "public"."product_type" AS ENUM('sale', 'rental', 'both');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."rental_condition" AS ENUM('new', 'used', 'refurbished');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."rental_status" AS ENUM('available', 'rented', 'under maintenance');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"category_id" text NOT NULL,
	"price" numeric NOT NULL,
	"quantity" integer NOT NULL,
	"product_type" "product_type" NOT NULL,
	"image_url" text,
	"is_active" boolean,
	"inventory_details" json NOT NULL,
	"rental_details" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stores" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "stores_user_id_unique" UNIQUE("user_id")
);
