const path = require('path');

module.exports = {
	process(src, filePath) {
		if (path.extname(filePath) !== '.svg') {
			return { code: src }; // Return an object with the code property
		}

		return { code: 'module.exports = {};' };
	},
	getCacheKey() {
		// The output is always the same.
		return 'svgTransform';
	},
};
