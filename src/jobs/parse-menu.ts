import { parseMenu } from "../shared/parse-menu.js";
import { defineJob } from "./index.js";

export const parseMenuJob = defineJob("parse-menu")
	.action(async () => {
		await parseMenu();
	})
	.repeatable({
		every: 20 * 60 * 1000,
	});
