'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const jade = require('gulp-jade');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const newer = require('gulp-newer');
const browserSync = require('browser-sync').create();

gulp.task('style', function () {
  return gulp.src('development/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('public/css'));
});

gulp.task('jade', function() {
    return gulp.src('development/pages/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('public/pages'));
});

gulp.task('clean', function() {
  return del('public');
});

gulp.task('assets', function() {
  return gulp.src('development/assets/**/*.*', {since: gulp.lastRun('assets')})
  .pipe(newer('public/assets'))
  .pipe(gulp.dest('public/assets'));
});

gulp.task('watch', function() {
  gulp.watch('development/scss/**/*.scss', gulp.series('style'));
  gulp.watch('development/pages/*.jade', gulp.series('jade'));
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
