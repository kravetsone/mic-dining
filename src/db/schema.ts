import { bigint } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
	id: bigint({ mode: "number" }).primaryKey().notNull(),
});
