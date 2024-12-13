import { takeFirstOrThrow } from "db/utils.js";
import { sql } from "drizzle-orm";
import { code, format } from "gramio";
import { DateTime } from "luxon";
import { getDatePaginateKeyboard } from "shared/keyboards/index.js";
import { db } from "../db/index.js";
import { menuTable } from "../db/schema.js";
import type { BotType } from "../index.js";

export default (bot: BotType) =>
	bot.hears("Меню", async (context) => {
		const menu = await db
			.select({
				date: menuTable.date,
				imageURL: menuTable.imageURL,

				previousDate: sql<string | null>`LAG(${menuTable.date}) OVER()`,
				nextDate: sql<string | null>`LEAD(${menuTable.date}) OVER()`,
			})
			.from(menuTable)
			.orderBy(
				sql` CASE
          WHEN date = CURRENT_DATE THEN 0
          WHEN date > CURRENT_DATE THEN 1
          ELSE 2
        END`,
				sql`ABS(date - CURRENT_DATE)`,
			)
			.limit(1)
			.then(takeFirstOrThrow);

		console.log(menu);

		const date = DateTime.fromSQL(menu.date);

		return context.sendPhoto(menu.imageURL, {
			caption: format`Меню на ${code(date.toFormat("dd.MM.yyyy"))}`,
			reply_markup: getDatePaginateKeyboard(menu.previousDate, menu.nextDate),
		});
	});
