import { db } from "db/index.js";
import { menuTable } from "db/schema.js";
import { takeFirstOrThrow } from "db/utils.js";
import { eq, sql } from "drizzle-orm";
import { MediaInput, code, format } from "gramio";
import { DateTime } from "luxon";
import { getDatePaginateKeyboard } from "shared/keyboards/index.js";
import type { BotType } from "../index.js";
import { selectDate } from "../shared/callback-data/index.js";

export default (bot: BotType) =>
	bot.callbackQuery(selectDate, async (context) => {
		const menu = await db
			.select({
				date: menuTable.date,
				imageURL: menuTable.imageURL,

				previousDate: sql<
					string | null
				>`LAG(${menuTable.date}) OVER(ORDER BY ${menuTable.date})`,
				nextDate: sql<
					string | null
				>`LEAD(${menuTable.date}) OVER(ORDER BY ${menuTable.date})`,
			})
			.from(menuTable)
			.orderBy(
				sql` CASE
                  WHEN date = ${context.queryData.date} THEN 0
                  WHEN date > CURRENT_DATE THEN 1
                  ELSE 2
                END`,
				sql`ABS(date - CURRENT_DATE)`,
			)
			.limit(1)
			.then(takeFirstOrThrow);
		if (!menu) return context.answer("Меню не найдено");

		const date = DateTime.fromSQL(menu.date);

		return context.editMedia(
			MediaInput.photo(menu.imageURL, {
				caption: format`Меню на ${code(date.toFormat("dd.MM.yyyy"))}`,
			}),
			{
				reply_markup: getDatePaginateKeyboard(menu.previousDate, menu.nextDate),
			},
		);
	});
