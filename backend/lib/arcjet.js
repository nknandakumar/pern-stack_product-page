import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";
import "dotenv/config";

// arcjet initialization
export const aj = arcjet({
	key: process.env.ARCJET_KEY,
	characteristics: ["ip.src"],
	rules: [
		//Shield protects app from common attacks  e.g. SQL Injection, XSS, CSRF, etc
		shield({ mode: "LIVE" }),
		detectBot({
			mode: "LIVE",
			// Block all bots except search engines
			allow: ["CATEGORY:SEARCH_ENGINE"],
		}),
		//rate limiting
		tokenBucket({
			mode: "LIVE",
			refillRate: 30,
			interval: 5,
			capacity: 20,
		}),
	],
});
