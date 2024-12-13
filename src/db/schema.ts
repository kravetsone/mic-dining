import {
	bigint,
	boolean,
	date,
	integer,
	primaryKey,
	smallint,
	text,
	time,
	timestamp,
	uniqueIndex,
} from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
	id: bigint({ mode: "number" }).primaryKey().notNull(),
	groupId: text().references(() => groupsTable.code),
	isNotificationEnabled: boolean().notNull().default(true),
});

export const groupsTable = pgTable("groups", {
	code: text().primaryKey().notNull(),
});

export const groupDiningTimesTable = pgTable(
	"group_dining_times",
	{
		groupId: text()
			.references(() => groupsTable.code)
			.notNull(),
		date: date().notNull(),
		startTime: time().notNull(),
		endTime: time().notNull(),
	},
	(t) => [primaryKey({ columns: [t.groupId, t.date] })],
);

export const menuTable = pgTable("menus", {
	date: date().notNull().primaryKey(),
	imageURL: text().notNull(),
});

// export const menuItemTable = pgTable("menu_items", {
// 	id: integer().generatedAlwaysAsIdentity().primaryKey(),
// 	date: date().notNull(),
// 	calories: smallint().notNull(),
// 	price: integer().notNull(),
// });
