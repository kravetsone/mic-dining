import type { LanguageMap, ShouldFollowLanguage } from "@gramio/i18n";
import { bold, code, format } from "gramio";

export const ru = {
	selectedMenu: (
		date: string,
		time: { startTime: string; endTime: string } | undefined,
		group: string | null,
	) => format`Меню на ${code(date)}
	
	${time && group ? format`Время обеда группы ${code(group)}: ${bold(time.startTime.slice(0, 5))} - ${bold(time.endTime.slice(0, 5))}` : ""}`,

	menuUpdated: (date: string) => format`Появилось меню на ${code(date)}!`,

	selectGroup: {
		firstTip: format`Напишите название группы в формате ${code`ИСП-4-21`}`,
		notFound: format`Кажется, что такой группы не существует... Попробуй свериться с официальным списком и ввести в формате ${code`ИСП-4-21`}`,
		selected: (group: string) => format`Группа ${bold(group)} успешно выбрана!`,
	},

	settings: {
		text: (group: string | null) => format`Группа: ${group ?? "не выбрана"}`,
	},
} satisfies LanguageMap;
