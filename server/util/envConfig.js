import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { realpath, stat } from "fs";
import path from "path";
import { promisify } from "util";

const realpathAsync = promisify(realpath);
const statAsync = promisify(stat);
const existsAsync = async file => {
	try {
		await statAsync(file);
		return true;
	} catch (e) {
		if (e.code === "ENOENT") {
			return false;
		}
		throw e;
	}
};

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = realpathAsync(process.cwd());
const resolveApp = async relativePath => path.resolve(await appDirectory, relativePath);
const fileExistenceChecker = async file => {
	const exists = await existsAsync(file);
	return { file, exists };
};

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const getDotenvFilesListHierarchy = (envPath, nodeEnv) =>
	[
		`${envPath}.${nodeEnv}.local`,
		`${envPath}.${nodeEnv}`,
		// Don't include `.env.local` for `test` environment
		// since normally you expect tests to produce the same
		// results for everyone
		nodeEnv !== "test" && `${envPath}.local`,
		envPath
	].filter(Boolean);

const config = async envPath => {
	const realEnvPath = await resolveApp(envPath);
	const NODE_ENV = process.env.NODE_ENV;
	if (!NODE_ENV) {
		throw new Error("The NODE_ENV environment variable is required but was not specified.");
	}

	const dotenvFiles = getDotenvFilesListHierarchy(realEnvPath, NODE_ENV);
	const existenceOfFilesFiles = await Promise.all(dotenvFiles.map(fileExistenceChecker));
	existenceOfFilesFiles.filter(({ exists }) => exists).forEach(({ file }) => {
		dotenvExpand(
			dotenv.config({
				path: file
			})
		);
	});
};

export default config;
