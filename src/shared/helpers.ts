import { DateTime } from "luxon";
import type { MenuDateParsed } from "../types.js";

export function toDateSet(array: MenuDateParsed[]) {
	return new Set(array.map((item) => item.date.toISODate()));
}

// Функция для нахождения разницы между двумя массивами
export function findDifference(arr1: MenuDateParsed[], arr2: MenuDateParsed[]) {
	const set1 = toDateSet(arr1);
	const set2 = toDateSet(arr2);

	const difference = [...set1].filter((date) => !set2.has(date));

	console.log(difference);

	return difference.map((date) => ({
		date: DateTime.fromISO(date!),
		imageURL: arr1.find((item) => item.date.toISODate() === date)!.imageURL,
	}));
}
