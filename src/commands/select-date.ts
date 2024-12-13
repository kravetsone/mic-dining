import { and, eq, sql } from "drizzle-orm";
import { MediaInput, code, format } from "gramio";
import { DateTime } from "luxon";
import { db } from "../db/index.js";
import { groupDiningTimesTable, menuTable } from "../db/schema.js";
import { takeFirstOrThrow, takeFirstOrUndefined } from "../db/utils.js";
import type { BotType } from "../index.js";
import { selectDate } from "../shared/callback-data/index.js";
import { getDatePaginateKeyboard } from "../shared/keyboards/index.js";
import { t } from "../shared/locales/index.js";

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

		const time = context.user.groupId
			? await db
					.select({
						startTime: groupDiningTimesTable.startTime,
						endTime: groupDiningTimesTable.endTime,
					})
					.from(groupDiningTimesTable)
					.where(
						and(
							eq(groupDiningTimesTable.groupId, context.user.groupId),
							eq(groupDiningTimesTable.date, menu.date),
						),
					)
					.then(takeFirstOrUndefined)
			: undefined;

		return context.editMedia(
			MediaInput.photo(menu.imageURL, {
				caption: t(
					"selectedMenu",
					date.toFormat("dd.MM.yyyy"),
					time,
					context.user.groupId,
				),
			}),
			{
				reply_markup: getDatePaginateKeyboard(menu.previousDate, menu.nextDate),
			},
		);
	});
