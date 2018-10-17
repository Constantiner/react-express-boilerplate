import getConfigFiles from "@constantiner/resolve-node-configs-hierarchy";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

const config = async envPath => {
	const dotenvFiles = await getConfigFiles(envPath);
	dotenvFiles.forEach(file => {
		dotenvExpand(
			dotenv.config({
				path: file
			})
		);
	});
};

export default config;
