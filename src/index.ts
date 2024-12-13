import { autoAnswerCallbackQuery } from "@gramio/auto-answer-callback-query";
import { autoload } from "@gramio/autoload";
import { scenes } from "@gramio/scenes";
import { redisStorage } from "@gramio/storage-redis";
import { Bot } from "gramio";
import { redis } from "jobs/index.js";
import { selectGroupScene } from "scenes/select-group.js";
import { authPlugin } from "./plugins/auth.js";

const storage = redisStorage(redis);

export const bot = new Bot(process.env.BOT_TOKEN as string)
	.extend(autoAnswerCallbackQuery())
	.extend(
		scenes([selectGroupScene], {
			storage,
		}),
	)
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
