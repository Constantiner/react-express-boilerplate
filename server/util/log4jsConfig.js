import getConfigFiles from "@constantiner/resolve-node-configs-hierarchy";
import log4js from "log4js";

const configureLog4js = async () => {
	const log4jsConfigs = await getConfigFiles("server/log4js.json");
	if (log4jsConfigs.length > 0) {
		const configFile = log4jsConfigs[0];
		/* eslint-disable-next-line security/detect-non-literal-require */
		const config = require(configFile);
		log4js.configure(config);
	}
};

export default configureLog4js;
