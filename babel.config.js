module.exports = api => {
	const config = {
		presets: [],
		plugins: []
	};
	if (api.env("test")) {
		config.presets.push("@babel/preset-env");
	}
	return config;
};
