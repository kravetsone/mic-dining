import { db } from "db/index.js";
import { usersTable } from "db/schema.js";
import { takeFirstOrThrow, takeFirstOrUndefined } from "db/utils.js";
import { eq } from "drizzle-orm";
import { Plugin } from "gramio";

export const authPlugin = new Plugin("auth").derive(
	["message", "callback_query"],
	async (context) => {
		const tgId = context.from?.id!;

		let user = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.id, tgId))
			.then(takeFirstOrUndefined);

		console.log("User:", user);

		if (!user) {
			user = await db
				.insert(usersTable)
				.values({
					id: tgId,
				})
				.returning()
				.then(takeFirstOrThrow);
			console.log("User created:", user);
		}

		return {
			user: user!,
		};
	},
);
