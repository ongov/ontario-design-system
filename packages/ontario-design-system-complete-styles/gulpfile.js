import rimraf from 'rimraf';
import concat from 'gulp-concat';
import minify from 'gulp-clean-css';
import gulpif from 'gulp-if';
import { glob } from 'glob';
import { promises as fs } from 'fs';

import flatten from 'gulp-flatten';
import * as sass from 'sass';

import gulp from 'gulp';
const { dest, series, src, task, parallel, watch } = gulp;

const distDir = './dist';
const srcDir = './src';
const styleDir = './src/styles';
const fontsDir = ['./src/fonts/**'];
const componentsDirPath = './src/styles/components';
const dsGlobalStylesPackageDir = '../ontario-design-system-global-styles';
const dsComponentPackageDir = '../ontario-design-system-component-library';

/**
 * @param {{
 *   compress: boolean,
 *   sourcemaps: boolean,
 *   callback: function,
 *   [debug]: boolean
 * }} opts Configuration options
 */
const processSass = async (opts) => {
	const sassOptions = {
		style: 'expanded',
		loadPaths: ['../../node_modules'],
	};

	if (opts.debug) {
		sassOptions.sourceMap = true;
	}

	sass.compile('./src/styles/scss/theme.scss', sassOptions);

	const stream = src('./src/styles/scss/theme.scss', { sourcemaps: opts.sourcemaps })
		.pipe(gulpif(opts.compress, concat('ontario-theme.min.css'), concat('ontario-theme.css')))
		.pipe(gulpif(opts.compress, minify()))
		.pipe(dest(`${distDir}/styles/css/compiled`, { sourcemaps: '.' }));

	if (opts.callback) {
		opts.callback();
	}

	return stream;
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
	const componentSassFilePaths = await glob(globPattern);
	const contentLines = componentSassFilePaths.map((filePath) => {
		const paths = filePath.replace(/.*?\/.*?\/s.*?\//, '');
		return `@forward "../../../../${paths}";`;
	});

	const assetStyles = await fs.readFile('./asset-styles.scss', 'utf8');

	if (contentLines.length > 0) {
		try {
			const allComponentFilePath = `${styleDir}/scss/6-components/_all.component.scss`;
			const newContent = contentLines.join('\n') + '\n\n' + assetStyles;
			await fs.writeFile(allComponentFilePath, newContent);
		} catch (error) {
			console.error(`Error writing DS component styles file ${error}`);
			done(error);
		}
	} else {
		console.log('No files matching', globPattern, 'within', componentsDirPath);
	}

	done();
});

task('sass:build', async (done) => {
	await processSass({
		compress: false,
		debug: false,
		callback: done,
	});
});

task('sass:minify', async (done) => {
	await processSass({
		compress: true,
		callback: done,
	});
});

task('sass:copy-dist', () => {
	return src(`${styleDir}/**`).pipe(dest(`${distDir}/styles/`));
});

task('sass:build-minify', parallel('sass:build', 'sass:minify'));

// Move all non-style related fonts to the dist/fonts folder
task('fonts-move', () => {
	return src(fontsDir).pipe(dest(`${distDir}/fonts`));
});

// Move all necessary component assets to the dist/assets folder
task('assets-move', () => {
	return src([
		// `${dsComponentPackageDir}/src/components/ontario-dropdown-list/assets/**`,
		// `${dsComponentPackageDir}/src/components/ontario-footer/assets/**`,
		// `${dsComponentPackageDir}/src/components/ontario-header/assets/**`,
		`${dsComponentPackageDir}/src/components/**/assets/**`,
		`!${dsComponentPackageDir}/src/components/ontario-icon/assets/**`,
	])
		.pipe(flatten())
		.pipe(dest(`${distDir}/assets`));
});

// Move all Fractal scripts to the dist/scripts folder
task('scripts-move', () => {
	return src('./scripts/**').pipe(dest(`${distDir}/scripts`));
});

// Move favicons to the dist/favicons folder
task('favicons-move', () => {
	return src(`${dsGlobalStylesPackageDir}/src/favicons/**`).pipe(dest(`${distDir}/favicons`));
});

task('watch', (done) => {
	watch(styleDir, { ignoreInitial: false }, parallel('sass:build-minify'));
	done();
});

task('clean:dist', async () => {
	return await rimraf(distDir);
});

task('clean:src', async () => {
	return await rimraf(srcDir);
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
		'assets-move',
		'scripts-move',
		'favicons-move',
		'sass:copy-dist',
		'sass:build',
		'sass:minify',
		'clean:src',
	),
);

task('default', series('watch'));
