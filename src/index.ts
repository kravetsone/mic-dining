import { autoRetry } from "@gramio/auto-retry";
import { autoload } from "@gramio/autoload";
import { scenes } from "@gramio/scenes";
import { session } from "@gramio/session";
import { redisStorage } from "@gramio/storage-redis";
import { Bot } from "gramio";
import { greetingScene } from "./scenes/greeting";
import { i18n } from "./shared/locales/index";

const storage = redisStorage({
	host: process.env.REDIS_HOST,
});

const bot = new Bot(process.env.TOKEN as string)
	.extend(autoRetry())
	.extend(session())
	.extend(
		scenes([greetingScene], {
			storage,
		}),
	)
	.extend(autoload())
	.derive("message", (context) => ({
		t: i18n.buildT(context.from?.languageCode ?? "en"),
	}))
	.onStart(({ info }) => console.log(`✨ Bot ${info.username} was started!`));

bot.start();
export type BotType = typeof bot;
