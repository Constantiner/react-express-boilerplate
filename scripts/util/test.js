import childProcess from "child_process";
import jest from "jest";
import getConfigFiles from "@constantiner/resolve-node-configs-hierarchy";

const getJestConfigFile = async jestConfigFile => {
	const configPath = jestConfigFile;
	const jestConfigFiles = await getConfigFiles(configPath, true);
	if (jestConfigFiles.length > 0) {
		// Return the most actual config
		return jestConfigFiles[0];
	}
};

const getArgv = async jestConfigFile => {
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
		const configPath = await getJestConfigFile(jestConfigFile);
		if (configPath) {
			argv.push("--config");
			argv.push(configPath);
		}
	}

	return argv;
};

const runJest = async jestConfigFile => {
	const argv = await getArgv(jestConfigFile);
	jest.run(argv);
};

export default runJest;
