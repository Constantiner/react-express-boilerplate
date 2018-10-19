import childProcess from "child_process";
import jest from "jest";
import getConfigFiles from "@constantiner/resolve-node-configs-hierarchy";
import paths from "../config/server/serverPaths";

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "test";
process.env.NODE_ENV = "test";
process.env.PUBLIC_URL = "";

const getJestConfigFile = async () => {
	const configPath = paths.jestConfig;
	const jestConfigFiles = await getConfigFiles(configPath);
	if (jestConfigFiles.length > 0) {
		// Return the most actual config
		return jestConfigFiles[0];
	}
};

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
	throw err;
});

const getArgv = async () => {
	const execSync = childProcess.execSync;
	let argv = process.argv.slice(2);

	function isInGitRepository() {
		try {
			execSync("git rev-parse --is-inside-work-tree", { stdio: "ignore" });
			return true;
		} catch (e) {
			return false;
		}
	}

	function isInMercurialRepository() {
		try {
			execSync("hg --cwd . root", { stdio: "ignore" });
			return true;
		} catch (e) {
			return false;
		}
	}

	// Watch unless on CI, in coverage mode, or explicitly running all tests
	if (!process.env.CI && argv.indexOf("--coverage") === -1 && argv.indexOf("--watchAll") === -1) {
		// https://github.com/facebook/create-react-app/issues/5210
		const hasSourceControl = isInGitRepository() || isInMercurialRepository();
		argv.push(hasSourceControl ? "--watch" : "--watchAll");
	}

	if (argv.indexOf("--config") === -1) {
		const configPath = await getJestConfigFile();
		console.log(`configPath: "${configPath}"`);
		if (configPath) {
			argv.push("--config");
			argv.push(configPath);
		}
	}

	return argv;
};

getArgv().then(argv => jest.run(argv));
