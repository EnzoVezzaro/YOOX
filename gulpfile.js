'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');

gulp.task('img', function () {
    gulp.src('static/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/images/'))
});

gulp.task('sass', function () {
  return gulp.src('static/stylesheets/sass/main.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('static/stylesheets'));
});

gulp.task('sass:watch', function () {
  gulp.watch('static/stylesheets/**/*.sass', ['sass']);
});

gulp.task('default', ['sass']);
