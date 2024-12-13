import { InlineKeyboard, Keyboard } from "gramio";
import { parseMenu } from "shared/parse-menu.js";
import type { BotType } from "../index.js";

export default (bot: BotType) =>
	bot
		.command("start", (context) =>
			context.send(`Привет, ${context.from?.firstName}!`, {
				reply_markup: new Keyboard().text("Меню"),
			}),
		)
		.command("force", parseMenu);
