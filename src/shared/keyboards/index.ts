import { InlineKeyboard, Keyboard } from "gramio";
import { DateTime } from "luxon";
import { selectDate } from "shared/callback-data/index.js";

export const mainKeyboard = new Keyboard().text("Меню").text("Настройки");

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

export function getSettingsKeyboard(isNotificationEnabled: boolean) {
	return new InlineKeyboard()
		.columns(1)
		.text("Изменить группу", "edit-group")
		.text(
			isNotificationEnabled
				? "🔕 Выключить уведомления"
				: "🔔 Включить уведомления",
			"toggle-notification",
		)
		.build();
}

export const cancelKeyboard = new InlineKeyboard()
	.text("Отмена", "cancel")
	.build();
