import { db } from "db/index.js";
import { menuTable, usersTable } from "db/schema.js";
import { inArray } from "drizzle-orm";
import { DateTime } from "luxon";
import { MIC_BASE_URL, config } from "../config.js";
import type { MenuDateParsed, MenuMicResponse } from "../types.js";
import { broadcast } from "./broadcast.js";
import { findDifference } from "./helpers.js";

export async function parseMenu() {
	const response = await fetch(config.MIC_DINING_INFO_URL);

	const { data } = (await response.json()) as MenuMicResponse;

	const menuFiles = data.folders.at(0)!.files;

	const results: MenuDateParsed[] = [];

	for (const menuFile of menuFiles) {
		const [day, month] = menuFile.title.split(".").map(Number);

		const date = DateTime.fromObject({
			day,
			month,
		}).setZone("Europe/Moscow");
		console.log(menuFile.title, date);

		results.push({
			date: date,
			imageURL: `${MIC_BASE_URL}${menuFile.src}`,
		});
	}

	const existsMenus = await db
		.select()
		.from(menuTable)
		.where(
			inArray(
				menuTable.date,
				results.map((x) => x.date.toSQLDate()!),
			),
		);

	const differences = findDifference(
		results,
		existsMenus.map((x) => ({ ...x, date: DateTime.fromSQL(x.date) })),
	);

	console.log(differences);

	if (!differences.length) return;

	await db.insert(menuTable).values(
		differences.map((x) => ({
			date: x.date.toSQLDate()!,
			imageURL: x.imageURL,
		})),
	);

	const users = await db
		.select({
			id: usersTable.id,
		})
		.from(usersTable);

	for (const difference of differences) {
		await broadcast.start(
			"menu-updated",
			users.map((x) => [
				{
					chatId: x.id,
					photo: difference.imageURL,
					date: difference.date.toFormat("dd.MM.yyyy"),
				},
			]),
		);
	}
}

parseMenu();
