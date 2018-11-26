import getConfigFiles from "@constantiner/resolve-node-configs-hierarchy";
import path from "path";
import fs from "fs";

export default function() {
	const callback = this.async();
	const thisPath = path.resolve(this.resourcePath);
	getConfigFiles(thisPath)
		.then(paths => paths[0])
		.then(realPath => {
			this.addDependency(realPath);
			fs.readFile(realPath, "utf-8", (err, resolvedFile) => {
				if (err) {
					return callback(err);
				}
				callback(null, resolvedFile);
			});
		});
}
