import type { BotType } from "../index";

export default (bot: BotType) =>
	bot.command("start", (context) => context.send("Hi!"));
