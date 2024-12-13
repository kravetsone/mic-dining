import { Redis } from "ioredis";
import { initJobify } from "jobify";
import { config } from "../config.js";

export const redis = new Redis({
	host: config.REDIS_HOST,
	maxRetriesPerRequest: null,
});

export const defineJob = initJobify(redis);
