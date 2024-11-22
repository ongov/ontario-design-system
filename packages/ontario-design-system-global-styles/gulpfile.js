import { rimraf } from 'rimraf';
import fs from 'fs/promises';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import minify from 'gulp-clean-css';
import gulpif from 'gulp-if';
import * as sass from 'sass';
import gulp from 'gulp';
import through2 from 'through2';
import paths from './paths-constants.js'; // Import paths object

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
		outputStyle: opts.compress ? 'compressed' : 'expanded',
		includePaths: ['../../node_modules'],
	};

	return [
		src(paths.styles.theme, { sourcemaps: opts.sourcemaps })
			.pipe(
				through2.obj((file, _, cb) => {
					try {
						if (file.isBuffer()) {
							const result = sass.compile(file.path, sassOptions);
							file.contents = Buffer.from(result.css); // Replace file buffer with compiled CSS
						}
						cb(null, file);
					} catch (err) {
						console.error('Sass Compilation Error:', err);
						cb(err);
					}
				}),
			)
			.pipe(autoprefixer())
			.pipe(gulpif(opts.compress, concat('ontario-theme.min.css'), concat('ontario-theme.css')))
			.pipe(gulpif(opts.compress, minify()))
			.pipe(dest(paths.output.theme, { sourcemaps: opts.sourcemaps ? '.' : false })),

		src(paths.styles.fonts, { sourcemaps: opts.sourcemaps })
			.pipe(
				through2.obj((file, _, cb) => {
					try {
						if (file.isBuffer()) {
							const result = sass.compile(file.path, sassOptions);
							file.contents = Buffer.from(result.css); // Replace file buffer with compiled CSS
						}
						cb(null, file);
					} catch (err) {
						console.error('Sass Compilation Error:', err);
						cb(err);
					}
				}),
			)
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

// Move all non-style related fonts to the dist/fonts folder
task('fonts-move', () => {
	return src(paths.fonts, { base: paths.srcDir }).pipe(dest(paths.distDir));
});

// Move all favicons to the dist/favicons folder
task('favicons-move', () => {
	return src(paths.favicons, { base: paths.srcDir }).pipe(dest(paths.output.favicons));
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
	series('clean', 'fonts-move', 'favicons-move', 'sass:copy-dist', 'sass:copy-tokens', 'sass:build-minify'),
);

task('default', series('watch'));
