import env from "env-var";

export const MIC_BASE_URL = "https://mic.mskobr.ru";

export const config = {
	MIC_DINING_INFO_URL: env
		.get("MIC_DINING_INFO_URL")
		.default(`${MIC_BASE_URL}/v1/api/folder_and_file/list/30130`)
		.asString(),

	REDIS_HOST: env.get("REDIS_HOST").default("localhost").asString(),
};
