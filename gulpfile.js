'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
  
gulp.task('sass', function () {
  return gulp.src('./sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css/'))
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/styl.scss', ['sass','autoprefixer']);
});

gulp.task('autoprefixer', function () {
    var postcss      = require('gulp-postcss');
    var sourcemaps   = require('gulp-sourcemaps');
    var autoprefixer = require('autoprefixer');

   return gulp.src('./css/src/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'));
});


gulp.task('compress', function (cb) {
  var pump = require('pump');
  pump([
        gulp.src('js/script.js'),
        uglify(),
        gulp.dest('script_ugly.js')
    ],
    cb
  );
});


gulp.task('general', ['sass','compress' ]);