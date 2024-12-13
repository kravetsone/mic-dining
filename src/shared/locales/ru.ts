import type { LanguageMap, ShouldFollowLanguage } from "@gramio/i18n";
import { bold, code, format } from "gramio";

export const ru = {
	selectedMenu: (date: string) => format`Меню на ${code(date)}`,

	menuUpdated: (date: string) => format`Появилось меню на ${code(date)}!`,
} satisfies LanguageMap;
