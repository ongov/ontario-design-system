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
	dsTokens: {
		src: '../ontario-design-system-design-tokens/dist/scss/_variables.scss',
		dest: './dist/styles/scss/1-variables/_tokens.variables.scss',
	},
	output: {
		theme: './dist/styles/css/compiled',
		fonts: './dist/misc/',
		fontsDist: './dist/fonts/',
		styles: './dist/styles/',
		favicons: './dist/favicons',
	},
};

export default paths;
