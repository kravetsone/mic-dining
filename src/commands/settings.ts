import { sql } from "drizzle-orm";
import { db } from "../db/index.js";
import { usersTable } from "../db/schema.js";
import { takeFirstOrThrow } from "../db/utils.js";
import type { BotType } from "../index.js";
import { selectGroupScene } from "../scenes/select-group.js";
import { getSettingsKeyboard } from "../shared/keyboards/index.js";
import { t } from "../shared/locales/index.js";

export default (bot: BotType) =>
	bot
		.hears("Настройки", (context) => {
			return context.send(t("settings.text", context.user.groupId), {
				reply_markup: getSettingsKeyboard(context.user.isNotificationEnabled),
			});
		})
		.callbackQuery("edit-group", (context) => {
			return context.scene.enter(selectGroupScene);
		})
		.callbackQuery("toggle-notification", async (context) => {
			const { isNotificationEnabled } = await db
				.update(usersTable)
				.set({
					isNotificationEnabled: sql`NOT ${usersTable.isNotificationEnabled}`,
				})
				.returning({
					isNotificationEnabled: usersTable.isNotificationEnabled,
				})
				.then(takeFirstOrThrow);

			return context.editText(t("settings.text", context.user.groupId), {
				reply_markup: getSettingsKeyboard(isNotificationEnabled),
			});
		});
