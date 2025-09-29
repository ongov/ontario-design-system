import { rimraf } from 'rimraf';
import fs from 'fs/promises';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import minify from 'gulp-clean-css';
import gulpif from 'gulp-if';
import * as dartSass from 'sass';
import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import paths from './paths-constants.js'; // Import paths object

const sass = gulpSass(dartSass);

const { dest, series, src, task, parallel, watch } = gulp;

/**
 * @param {{
 *   compress:boolean,
 *   sourcemaps:boolean,
 *   callback:function,
 *   [debug]:boolean
 * }} opts Configuration options
 *
 */
const processSass = (opts) => {
	const sassOptions = {
		importers: [new dartSass.NodePackageImporter()],
		style: opts.compress ? 'compressed' : 'expanded',
	};

	return [
		// Process main theme styles
		src(paths.styles.theme, { sourcemaps: opts.sourcemaps })
			.pipe(sass(sassOptions).on('error', sass.logError))
			.pipe(autoprefixer())
			.pipe(gulpif(opts.compress, concat('ontario-theme.min.css'), concat('ontario-theme.css')))
			.pipe(gulpif(opts.compress, minify()))
			.pipe(dest(paths.output.theme, { sourcemaps: opts.sourcemaps ? '.' : false })),

		// Process font styles
		src(paths.styles.fonts, { sourcemaps: opts.sourcemaps })
			.pipe(sass(sassOptions).on('error', sass.logError))
			.pipe(autoprefixer())
			.pipe(
				gulpif(opts.compress, concat('ontario-design-system-fonts.min.css'), concat('ontario-design-system-fonts.css')),
			)
			.pipe(gulpif(opts.compress, minify()))
			.pipe(dest(paths.output.fonts, { sourcemaps: opts.sourcemaps ? '.' : false })),
	];
};

// Tasks

task('sass:build', (done) => {
	processSass({
		compress: false,
		debug: false,
		sourcemaps: true,
	});
	done();
});

task('sass:minify', (done) => {
	processSass({
		compress: true,
		debug: false,
		sourcemaps: false,
	});
	done();
});

task('sass:copy-dist', () => {
	return src(paths.styles.scss).pipe(dest(paths.styles.output));
});

// Replace node_module reference of tokens file with actual token declaration
task('sass:copy-tokens', () => {
	return fs.copyFile(paths.dsTokens.src, paths.dsTokens.dest);
});

task('sass:build-minify', parallel('sass:build', 'sass:minify'));

task('index:move', () => fs.cp(paths.index, paths.output.index));

// Move all non-style related fonts to the dist/fonts folder
task('fonts:move', () => {
	return fs.cp(paths.fonts, paths.output.fontsDist, { recursive: true });
});

// Move all favicons to the dist/favicons folder
task('favicons:move', () => {
	return fs.cp(paths.favicons, paths.output.favicons, { recursive: true });
});

task('watch', (done) => {
	watch(paths.styles.dir, { ignoreInitial: false }, parallel('sass:build-minify'));
	done();
});

task('clean', async () => {
	return await rimraf(paths.distDir);
});

task(
	'deploy',
	series(
		'clean',
		'index:move',
		'fonts:move',
		'favicons:move',
		'sass:copy-dist',
		'sass:copy-tokens',
		'sass:build-minify',
	),
);

task('default', series('watch'));
