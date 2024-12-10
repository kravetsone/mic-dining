import type { ShouldFollowLanguage } from "@gramio/i18n";
import { bold, format } from "gramio";
import type { en } from "./en";

export const ru = {
	greeting: (name: string) => format`Привет, ${bold(name)}!`,
} satisfies ShouldFollowLanguage<typeof en>;
