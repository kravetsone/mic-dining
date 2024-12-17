import { autoAnswerCallbackQuery } from "@gramio/auto-answer-callback-query";
import { autoload } from "@gramio/autoload";
import { scenes } from "@gramio/scenes";
import { redisStorage } from "@gramio/storage-redis";
import { eq } from "drizzle-orm";
import { Bot } from "gramio";
import { db } from "./db/index.js";
import { chatsTable } from "./db/schema.js";
import { takeFirstOrThrow, takeFirstOrUndefined } from "./db/utils.js";
import { redis } from "./jobs/index.js";
import { authPlugin } from "./plugins/auth.js";
import { selectGroupScene } from "./scenes/select-group.js";
import "./jobs/parse-menu.js";

const storage = redisStorage(redis);

export const bot = new Bot(process.env.BOT_TOKEN as string)
	.extend(autoAnswerCallbackQuery())
	.extend(
		scenes([selectGroupScene], {
			storage,
		}),
	)
	.extend(authPlugin)
	.on("message", async (context, next) => {
		if (context.chat.type === "private") return next();

		let chat = await db
			.select()
			.from(chatsTable)
			.where(eq(chatsTable.id, context.chatId))
			.then(takeFirstOrUndefined);

		if (!chat) {
			chat = await db
				.insert(chatsTable)
				.values({
					id: context.chatId,
				})
				.returning()
				.then(takeFirstOrThrow);
		}
	})
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
