import { deleteAsync } from 'del';

import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import minify from 'gulp-clean-css';
import gulpif from 'gulp-if';
import glob from 'glob-promise';
import fs from 'fs/promises';

import gulpSass from 'gulp-sass';
import dartSass from 'sass';
const sass = gulpSass(dartSass);

import gulp from 'gulp';
const { dest, series, src, task, parallel, watch } = gulp;

const distDir = './dist';
const srcDir = './src';
const styleDir = './src/styles';
const fontsDir = ['./src/fonts/**'];
const componentsDirPath = './src/styles/components';
const dsGlobalStylesPackageDir = 'node_modules/@ontario-digital-service/ontario-design-system-global-styles';
const dsComponentPackageDir = 'node_modules/@ontario-digital-service/ontario-design-system-component-library';

/**
 * @param {{
 *   compress:boolean,
 *   sourcemaps:boolean,
 *   callback:function,
 *   [debug]:boolean
 * }} opts Configuration options
 */
const processSass = (opts) => {
	const sassOptions = {
		outputStyle: 'expanded',
		includePaths: ['./node_modules'],
	};

	if (opts.debug) {
		sassOptions.sourceComments = true;
	}

	src('./src/styles/scss/theme.scss')
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(concat(gulpif(opts.compress, 'ontario-theme.min.css', 'ontario-theme.css')))
		.pipe(gulpif(opts.compress, minify()))
		.pipe(dest(`${distDir}/styles/css/compiled`));

	if (opts.callback) {
		opts.callback();
	}
};

task('copy:ds-global-styles', () => {
	return src(`${dsGlobalStylesPackageDir}/src/**`).pipe(dest(srcDir));
});

task('copy:component-global-styles', () => {
	return src(`${dsComponentPackageDir}/src/global.scss`).pipe(dest(`${srcDir}/styles`));
});

task('copy:component-common-styles', () => {
	return src(`${dsComponentPackageDir}/src/styles/**/*.scss`).pipe(dest(`${srcDir}/styles/styles`));
});

task('copy:component-utils', () => {
	return src(`${dsComponentPackageDir}/src/utils/**/*.scss`).pipe(dest(`${srcDir}/styles/utils`));
});

task('copy:component-styles', () => {
	return src(`${dsComponentPackageDir}/src/components/**/*.scss`).pipe(dest(`${srcDir}/styles/components/`));
});

task('generate:components-import-file', async (done) => {
	const globPattern = `${componentsDirPath}/**/*.scss`;
	const componentSassFilePaths = await glob(globPattern, null);
	const contentLines = componentSassFilePaths.map((filePath) => `@forward "${filePath}";`);
	if (contentLines.length > 0) {
		try {
			await fs.writeFile(`${styleDir}/scss/6-components/_all.component.scss`, contentLines.join('\n'));
		} catch (error) {
			console.error(`Error writing DS component styles file ${error}`);
			done(error);
		}
	} else console.log('No files matching', globPattern, 'within', componentsDirPath);

	done();
});

task('sass:build', (done) => {
	processSass({
		compress: false,
		debug: false,
		callback: done,
	});
});

task('sass:minify', (done) => {
	processSass({
		compress: true,
		callback: done,
	});
});

task('sass:copy-dist', () => {
	return src(`${styleDir}/**`).pipe(dest(`${distDir}/styles/`));
});

task('sass:build-minify', parallel('sass:build', 'sass:minify'));

// Move all non-style related fonts to the dist/fonts folder
task('fonts-move', (done) => {
	return src(fontsDir).pipe(dest(`${distDir}/fonts`));
});

task('watch', (done) => {
	watch(styleDir, { ignoreInitial: false }, parallel('sass:build-minify'));
	done();
});

task('clean:dist', async (done) => {
	return await deleteAsync(distDir);
});

task('clean:src', async (done) => {
	return await deleteAsync(srcDir);
});

task(
	'deploy',
	series(
		'clean:dist',
		'clean:src',
		'copy:ds-global-styles',
		'copy:component-styles',
		'copy:component-global-styles',
		'copy:component-common-styles',
		'copy:component-utils',
		'generate:components-import-file',
		'fonts-move',
		'sass:copy-dist',
		'sass:build-minify',
		'clean:src',
	),
);

task('default', series('watch'));
