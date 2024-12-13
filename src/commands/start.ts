import { InlineKeyboard, Keyboard } from "gramio";
import { mainKeyboard } from "shared/keyboards/index.js";
import { parseMenu } from "shared/parse-menu.js";
import type { BotType } from "../index.js";

export default (bot: BotType) =>
	bot
		.command("start", (context) =>
			context.send(`Привет, ${context.from?.firstName}!`, {
				reply_markup: mainKeyboard,
			}),
		)
		.command("force", parseMenu);
