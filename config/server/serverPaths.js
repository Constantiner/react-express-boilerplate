import path from "path";
import fs from "fs";

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

export default {
	jestConfig: resolveApp("config/server/jest/jest.config.json")
};
