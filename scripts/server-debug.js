import getConfigFiles from "@constantiner/resolve-node-configs-hierarchy";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import nodemon from "nodemon";

process.env.NODE_ENV = "development";

const initEnv = async () => {
	const dotenvFiles = await getConfigFiles("server/.env");
	// Load environment variables from .env* files. Suppress warnings using silent
	// if this file is missing. dotenv will never modify any environment variables
	// that have already been set.  Variable expansion is supported in .env files.
	// https://github.com/motdotla/dotenv
	// https://github.com/motdotla/dotenv-expand
	dotenvFiles.forEach(dotenvFile =>
		dotenvExpand(
			dotenv.config({
				path: dotenvFile
			})
		)
	);
	return true;
};

const getNodemonConfig = async () => {
	const nodemonConfigFiles = await getConfigFiles("config/server/nodemon.json");
	if (nodemonConfigFiles.length > 0) {
		// Return the most actual config
		return nodemonConfigFiles.pop();
	}
};

const debugServer = async () => {
	try {
		await initEnv();
		const nodemonConfig = await getNodemonConfig();
		const DEBUG_INSPECT_HOST = process.env.DEBUG_INSPECT_HOST || "127.0.0.1";
		const DEBUG_INSPECT_PORT = process.env.DEBUG_INSPECT_PORT || "9229";
		const inspectArgs = `--inspect=${DEBUG_INSPECT_HOST}:${DEBUG_INSPECT_PORT}`;
		const options = {
			execArgs: [`-r`, `esm`, inspectArgs],
			script: "./bin/www"
		};
		if (nodemonConfig) {
			options.configFile = nodemonConfig;
		}
		const monitor = nodemon(options);
		monitor.on("log", ({ colour: colouredMessage }) => console.log(colouredMessage));
	} catch (e) {
		console.error(e);
	}
};

debugServer();
