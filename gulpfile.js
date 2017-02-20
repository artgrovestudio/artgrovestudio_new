'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const jade = require('gulp-jade');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const newer = require('gulp-newer');
const browserSync = require('browser-sync').create();

function log(error) {
    console.log([
        '',
        "----------ERROR MESSAGE START----------",
        ("[" + error.name + " in " + error.plugin + "]"),
        error.message,
        "----------ERROR MESSAGE END----------",
        ''
    ].join('\n'));
    this.end();
}

gulp.task('style', function () {
  return gulp.src('development/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('public/css'));
});

gulp.task('jade', function() {
  return gulp.src('development/pages/*.jade')
    .pipe(jade())
    .on('error', log)
    .pipe(gulp.dest('public'));
});

gulp.task('clean', function() {
  return del('public');
});

gulp.task('assets', function() {
  return gulp.src('development/assets/**/*.*', {since: gulp.lastRun('assets')})
  .pipe(newer('public/assets'))
  .pipe(gulp.dest('public/assets'));
});

gulp.task('js', function() {
  return gulp.src('development/js/*.*', {since: gulp.lastRun('assets')})
  .pipe(newer('public/js'))
  .pipe(gulp.dest('public/js'));
});

gulp.task('watch', function() {
  gulp.watch('development/scss/**/*.scss', gulp.series('style'));
  gulp.watch('development/pages/**/*.jade', gulp.series('jade'));
  gulp.watch('development/js/*.js', gulp.series('js'));
});

gulp.task('server', function () {
  browserSync.init({
    server: 'public'
  });

  browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('build',
  gulp.series(
    'clean',
    gulp.parallel(
      'style',
      'js',
      'assets',
      'jade'
    )
  )
);

gulp.task('dv',
  gulp.series(
    'build',
    gulp.parallel(
      'watch',
      'server'
    )
  )
);
