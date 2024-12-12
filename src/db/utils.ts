/**
 * Takes the first item from an array.
 *
 * @param items - The array to take the first item from.
 * @returns The first item from the array.
 */
export function takeFirst<TData>(items: TData[]) {
	return items.at(0);
}

/**
 * Takes the first item from an array or returns null if the array is empty.
 *
 * @param items - The array to take the first item from.
 * @returns The first item from the array or null.
 */
export function takeFirstOrNull<TData>(items: TData[]) {
	return takeFirst(items) ?? null;
}

export function takeFirstOrUndefined<TData>(items: TData[]) {
	return takeFirst(items) ?? undefined;
}

export function takeFirstOrThrow<TData>(items: TData[]) {
	const first = takeFirst(items);
	if (!first) throw new Error("Not found");

	return first;
}
