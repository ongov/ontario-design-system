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
 */
const processSass = (opts) => {
  const sassOptions = {
    outputStyle: 'expanded',
  };

  if (opts.debug) {
    sassOptions.sourceComments = true;
  }

  src('./src/scss/theme.scss')
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(concat(gulpif(opts.compress, 'ontario-theme.min.css', 'ontario-theme.css')))
    .pipe(gulpif(opts.compress, minify()))
    .pipe(dest(`${distDir}/styles`));

  if (opts.callback) {
    opts.callback();
  }
};

task('sass', (done) => {
  processSass({
    compress: false,
    debug: false,
    callback: done
  });
});

task('sass-minify', (done) => {
  processSass({
    compress: true,
    callback: done,
  });
});

task('sass:both', parallel('sass', 'sass-minify'));

// Move all non-style related fonts to the dist/fonts folder
task('fonts-move', (done) => {
  return src(fonts, { base: './src' })
    .pipe(dest(`${distDir}`));
  done();
});

task('watch', (done) => {
  watch(styleDir, { ignoreInitial: false }, parallel('sass:both'));
  done();
});

task('clean', (done) => {
  return del(distDir);
  done();
});

task('deploy', series('clean', 'fonts-move', 'sass:both'));

task('default', series('watch'));
