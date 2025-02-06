import { rimraf } from 'rimraf';
import concat from 'gulp-concat';
import minify from 'gulp-clean-css';
import gulpif from 'gulp-if';
import { glob } from 'glob';
import { promises as fs } from 'fs';
import flatten from 'gulp-flatten';
import * as dartSass from 'sass';
import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import paths from './paths-constants.js';

const sass = gulpSass(dartSass);

const { dest, series, src, task, parallel, watch } = gulp;

/**
 * Utility: Compile Sass using Dart Sass.
 * @param {string} input - Input Sass file path.
 * @param {string} outputFile - Output CSS file name.
 * @param {object} options - Sass options.
 */
const compileSass = (input, outputFile, options) => {
	const sassOptions = {
		style: options.compress ? 'compressed' : 'expanded',
		loadPaths: ['./node_modules'],
	};

	if (options.debug) {
		sassOptions.sourceComments = true;
	}

	return src(input, { sourcemaps: options.sourcemaps })
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(gulpif(options.compress, concat(`${outputFile}.min.css`), concat(`${outputFile}.css`)))
		.pipe(gulpif(options.compress, minify()))
		.pipe(dest(paths.output.theme, { sourcemaps: options.sourcemaps ? '.' : false }));
};

task('clean:dist', async () => {
	return await rimraf(paths.distDir);
});

task('clean:src', async () => {
	return await rimraf(paths.srcDir);
});

task('copy:ds-global-styles', () => {
	return src(paths.dsGlobalStyles.src).pipe(dest(paths.srcDir));
});

task('copy:component-global-styles', () => {
	return src(paths.dsComponentLibrary.globalStyles).pipe(dest(paths.styles.dir));
});

task('copy:component-common-styles', () => {
	return src(paths.dsComponentLibrary.commonStyles).pipe(dest(paths.styles.styles));
});

task('copy:component-utils', () => {
	return src(paths.dsComponentLibrary.utils).pipe(dest(paths.styles.utils));
});

task('copy:component-styles', () => {
	return src(paths.dsComponentLibrary.components).pipe(dest(paths.styles.components));
});

task('generate:components-import-file', async (done) => {
	const globPattern = paths.components.scss;
	const componentSassFilePaths = await glob(globPattern);
	const contentLines = componentSassFilePaths.map((filePath) => {
		// Remove the path up to the component name
		// e.g. from 'src/styles/components/ontario-button/ontario-button.scss' to 'ontario-button/ontario-button.scss'
		const paths = filePath.replace(/.*?\/.*?\/s.*?\//, '');
		return `@forward "./${paths}";`;
	});

	const assetStyles = await fs.readFile('./asset-styles.scss', 'utf8');

	if (contentLines.length > 0) {
		try {
			const newContent = contentLines.join('\n') + '\n\n' + assetStyles;
			await fs.writeFile(paths.files.componentsImport, newContent);
		} catch (error) {
			console.error(`Error writing DS component styles file ${error}`);
			done(error);
		}
	} else {
		console.warn('No files matching', globPattern, 'within', paths.components.dir);
	}

	done();
});

task('sass:build', async (done) => {
	compileSass(paths.files.theme, 'ontario-theme', {
		compress: false,
		sourcemaps: true,
	});
	done();
});

task('sass:minify', async (done) => {
	compileSass(paths.files.theme, 'ontario-theme', {
		compress: true,
		sourcemaps: false,
	});
	done();
});

task('sass:copy-dist', () => {
	return src(paths.styles.all).pipe(dest(paths.output.styles));
});

// Move all non-style related fonts to the dist/fonts folder
task('fonts-move', () => {
	return src(paths.fonts).pipe(dest(paths.output.fonts));
});

// Move all necessary component assets to the dist/assets folder
task('assets-move', () => {
	return src(paths.dsComponentLibrary.assets).pipe(flatten()).pipe(dest(paths.output.assets));
});

// Move all Fractal scripts to the dist/scripts folder
task('scripts-move', () => {
	return src(paths.scripts).pipe(dest(paths.output.scripts));
});

// Move favicons to the dist/favicons folder
task('favicons-move', () => {
	return src(paths.dsGlobalStyles.favicons).pipe(dest(paths.output.favicons));
});

task('sass:build-minify', parallel('sass:build', 'sass:minify'));

task('watch', (done) => {
	watch(paths.styles.dir, { ignoreInitial: false }, parallel('sass:build-minify'));
	done();
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
		'sass:build-minify',
		'clean:src',
	),
);

task('default', series('watch'));
