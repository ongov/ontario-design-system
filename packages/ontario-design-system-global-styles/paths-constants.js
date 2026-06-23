const paths = {
	distDir: './dist',
	srcDir: './src',
	styles: {
		dir: './src/sass/**',
		scss: './src/styles/scss/**/*.scss',
		output: './dist/styles/scss',
		theme: './src/styles/scss/theme.scss',
		fonts: './src/misc/ontario-design-system-fonts.scss',
	},
	fonts: './src/fonts',
	favicons: './src/favicons',
	index: './src/index.js',
	dsTokens: {
		// Source the shipped token declarations from the local frozen snapshot
		// (committed in DS-2686) rather than the live design-tokens package, so the
		// shipped SCSS partial is unaffected while design-tokens is rearchitected.
		src: './src/styles/scss/1-variables/_tokens.frozen.scss',
		dest: './dist/styles/scss/1-variables/_tokens.variables.scss',
	},
	output: {
		theme: './dist/styles/css/compiled',
		fonts: './dist/misc/',
		fontsDist: './dist/fonts/',
		styles: './dist/styles/',
		favicons: './dist/favicons',
		index: './dist/index.js',
	},
};

export default paths;
