import { InlineKeyboard, Keyboard } from "gramio";
import { DateTime } from "luxon";
import { selectDate } from "shared/callback-data/index.js";

function formatDate(date: string) {
	return DateTime.fromSQL(date).toFormat("dd.MM");
}

export function getDatePaginateKeyboard(
	previousDate: string | null,
	nextDate: string | null,
) {
	return new InlineKeyboard()
		.addIf(
			!!previousDate,
			InlineKeyboard.text(
				formatDate(previousDate!),
				selectDate.pack({
					date: previousDate!,
				}),
			),
		)
		.addIf(
			!!nextDate,
			InlineKeyboard.text(
				formatDate(nextDate!),
				selectDate.pack({ date: nextDate! }),
			),
		);
}
