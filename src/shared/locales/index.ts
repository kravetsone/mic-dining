import { defineI18n } from "@gramio/i18n";
import { en } from "./en";
import { ru } from "./ru";

export const i18n = defineI18n({
	primaryLanguage: "en",
	languages: {
		en,
		ru,
	},
});
