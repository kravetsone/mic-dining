CREATE TABLE "group_dining_times" (
	"group_id" text NOT NULL,
	"date" date NOT NULL,
	"start_time" time NOT NULL,
	"end_time" time NOT NULL,
	CONSTRAINT "group_dining_times_group_id_date_pk" PRIMARY KEY("group_id","date")
);
--> statement-breakpoint
CREATE TABLE "groups" (
	"code" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "menus" (
	"date" date PRIMARY KEY NOT NULL,
	"image_url" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "group_id" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "is_notification_enabled" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "group_dining_times" ADD CONSTRAINT "group_dining_times_group_id_groups_code_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_group_id_groups_code_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("code") ON DELETE no action ON UPDATE no action;