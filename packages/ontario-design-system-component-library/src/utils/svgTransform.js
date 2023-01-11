const path = require('path');

module.exports = {
	process(src, filePath) {
		if (path.extname(filePath) !== '.svg') {
			return src;
		}

		return 'module.exports = {};';
	},
	getCacheKey() {
		// The output is always the same.
		return 'svgTransform';
	},
};
