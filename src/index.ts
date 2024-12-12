import { autoload } from "@gramio/autoload";
import { Bot } from "gramio";
import { authPlugin } from "plugins/auth.js";

const bot = new Bot(process.env.BOT_TOKEN as string)
	.extend(authPlugin)
	.extend(await autoload())
	.onStart(({ info }) => console.log(`✨ Bot ${info.username} was started!`));

export type BotType = typeof bot;

await bot.start();

// .extend(autoRetry())
// .extend(session())
// .extend(
// 	scenes([], {
// 		storage,
// 	}),
// )

// .derive("message", (context) => ({
// 	t: i18n.buildT(context.from?.languageCode ?? "en"),
// }))
