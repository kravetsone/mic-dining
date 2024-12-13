import { bigint, date, integer, smallint, text } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
	id: bigint({ mode: "number" }).primaryKey().notNull(),
});

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
