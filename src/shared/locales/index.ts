import { defineI18n } from "@gramio/i18n";
import { ru } from "./ru.js";

export const i18n = defineI18n({
	primaryLanguage: "ru",
	languages: {
		ru,
	},
});

export const t = i18n.buildT("ru");
