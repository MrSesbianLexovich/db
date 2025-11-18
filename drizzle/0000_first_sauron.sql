CREATE TABLE "products" (
	"image" "bytea",
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"birthdate" timestamp,
	"age" integer NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
