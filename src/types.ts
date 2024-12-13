import type { DateTime } from "luxon";

export interface MenuDateParsed {
	date: DateTime;
	imageURL: string;
}

// MIC PARSED

export interface MenuMicResponse {
	data: MenuMicResponseData;
}
export interface MenuMicResponseData {
	folders: Folder[];
	files: File2[];
}

export interface Folder {
	id: number;
	ord: number;
	title: string;
	altName: string;
	pageId: number;
	folders: Folder[];
	files: File[];
}

export interface File {
	id: number;
	title: string;
	src: string;
	ext: string;
	altName: string;
	rel: number;
	ord: number;
}

export interface File2 {
	id: number;
	title: string;
	src: string;
	ext: string;
	altName: string;
	rel: number;
	ord: number;
}
