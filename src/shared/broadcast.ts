import { Broadcast } from "@gramio/broadcast";
import { bot } from "../index.js";
import { redis } from "../jobs/index.js";
import { t } from "./locales/index.js";

export interface MenuBroadcastData {
	chatId: number;
	photo: string;
	date: string;
}

export const broadcast = new Broadcast(redis).type(
	"menu-updated",
	async ({ date, chatId, photo }: MenuBroadcastData) => {
		await bot.api.sendPhoto({
			chat_id: chatId,
			photo,
			caption: t("menuUpdated", date),
		});
	},
);
