module.exports = function(api) {
	api.cache(true);
	const plugins = [];
	const presets = [];
	return {
		plugins,
		presets
	};
};
