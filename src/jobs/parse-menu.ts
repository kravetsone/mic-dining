import { parseMenu } from "../shared/parse-menu.js";
import { defineJob } from "./index.js";

export const parseMenuJob = await defineJob("parse-menu")
	.action(async () => {
		console.log("Parse menu", new Date());
		await parseMenu();
	})
	.repeatable({
		every: 20 * 60 * 1000,
	});
