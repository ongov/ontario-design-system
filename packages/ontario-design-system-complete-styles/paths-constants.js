// Paths object to consolidate all paths
const paths = {
	distDir: './dist',
	srcDir: './src',
	styles: {
		dir: './src/styles',
		styles: './src/styles/styles',
		utils: './src/styles/utils',
		components: './src/styles/components',
		all: './src/styles/**',
	},
	fonts: './src/fonts/**',
	scripts: './scripts/**',
	components: {
		dir: './src/styles/components',
		scss: './src/styles/components/**/*.scss',
	},
	dsGlobalStyles: {
		package: '../ontario-design-system-global-styles',
		favicons: '../ontario-design-system-global-styles/src/favicons/**',
		src: '../ontario-design-system-global-styles/dist/**',
	},
	dsComponentLibrary: {
		package: '../ontario-design-system-component-library',
		globalStyles: '../ontario-design-system-component-library/src/global.scss',
		commonStyles: '../ontario-design-system-component-library/src/styles/**/*.scss',
		utils: '../ontario-design-system-component-library/src/utils/**/*.scss',
		components: '../ontario-design-system-component-library/src/components/**/*.scss',
		assets: [
			'../ontario-design-system-component-library/src/components/**/assets/**',
			'!../ontario-design-system-component-library/src/components/ontario-icon/assets/**',
		],
	},
	files: {
		theme: './src/styles/scss/theme.scss',
		componentsImport: './src/styles/scss/6-components/_all.component.scss',
		assetStyles: './asset-styles.scss',
	},
	output: {
		theme: './dist/styles/css/compiled',
		fonts: './dist/fonts',
		assets: './dist/assets',
		scripts: './dist/scripts',
		favicons: './dist/favicons',
		styles: './dist/styles/',
	},
};

export default paths;
