import { InlineKeyboard, Keyboard } from "gramio";
import type { BotType } from "../index.js";

export default (bot: BotType) =>
	bot.command("start", (context) =>
		context.send(`Привет, ${context.from?.firstName}!`, {
			reply_markup: new Keyboard().text("Меню"),
		}),
	);
