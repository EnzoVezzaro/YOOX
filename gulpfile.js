'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var uncss = require('gulp-uncss');
var uglify = require('gulp-uglify');
var pump = require('pump');

// HTML Optimization

gulp.task('html', function() {
  return gulp.src('public/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('public'));
});

// UnUsed CSS

gulp.task('uncss', function () {
    return gulp.src('public/stylesheets/main.css')
        .pipe(uncss({
            html: ['public/index.html', 'https://enzovezzaro.github.io/YOOX_production/']
        }))
        .pipe(gulp.dest('public/stylesheets/'));
});

// IMG Optimization

gulp.task('img', function () {
    gulp.src('static/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/images/'))
});

// SASS Tasks

gulp.task('sass', function () {
  return gulp.src('static/stylesheets/sass/main.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('static/stylesheets'));
});

gulp.task('sass:watch', function () {
  gulp.watch('static/stylesheets/**/*.sass', ['sass']);
});

gulp.task('default', ['sass']);


// CSS Optimization

gulp.task('cssmin', function () {
    gulp.src('public/stylesheets/main.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/stylesheets'));
});

// JS OPtimization

gulp.task('js', function (cb) {
  pump([
        gulp.src('static/javascripts/*.js'),
        uglify(),
        gulp.dest('public/javascripts')
    ],
    cb
  );
});
