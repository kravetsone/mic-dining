import { Scene } from "@gramio/scenes";
import { db } from "db/index.js";
import { groupsTable, usersTable } from "db/schema.js";
import { eq } from "drizzle-orm";
import { cancelKeyboard } from "shared/keyboards/index.js";
import { t } from "shared/locales/index.js";

export const selectGroupScene = new Scene("select-group").step(
	["callback_query", "message"],
	async (context) => {
		if (context.is("callback_query") && context.data === "cancel") {
			await context.message?.delete();
			return context.scene.exit();
		}

		if (context.scene.step.firstTime || !context.is("message")) {
			return context.send(t("selectGroup.firstTip"), {
				reply_markup: cancelKeyboard,
			});
		}

		if (!context.text) return context.delete();

		const [group] = await db
			.select()
			.from(groupsTable)
			.where(eq(groupsTable.code, context.text));

		if (!group) return context.send(t("selectGroup.notFound"));

		await db
			.update(usersTable)
			.set({
				groupId: group.code,
			})
			.where(eq(usersTable.id, context.from!.id));

		await context.send(t("selectGroup.selected", group.code));

		return context.scene.exit();
	},
);
