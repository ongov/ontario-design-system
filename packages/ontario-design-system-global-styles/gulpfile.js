const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const minify = require('gulp-clean-css');
const gulpif = require('gulp-if');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const { dest, series, src, task, parallel, watch } = require('gulp');

const distDir = './dist';
const styleDir = './src/sass/**';
const fonts = ['./src/fonts/**'];

/**
 * @param {{
 *   compress:boolean,
 *   sourcemaps:boolean,
 *   callback:function,
 *   [debug]:boolean
 * }} opts Configuration options
 * 
 */
const processSass = opts => {
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

task('sass:build', done => {
	processSass({
		compress: false,
		debug: false,
		callback: done,
	});
});

task('sass:minify', done => {
	processSass({
		compress: true,
		callback: done,
	});
});

task('sass:copy-dist', () => {
	return src('src/styles/scss/**/*.scss').pipe(dest('dist/styles/scss'));
});

task('sass:build-minify', parallel('sass:build', 'sass:minify'));

// Move all non-style related fonts to the dist/fonts folder
task('fonts-move', done => {
	return src(fonts, { base: './src' }).pipe(dest(distDir));
});

task('watch', done => {
	watch(styleDir, { ignoreInitial: false }, parallel('sass:build-minify'));
	done();
});

task('clean', done => {
	return del(distDir);
});

task('deploy', series('clean', 'fonts-move', 'sass:copy-dist', 'sass:build-minify'));

task('default', series('watch'));
