'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('compress', function() {
  return gulp.src('plunge.js')
  .pipe(uglify())
  .pipe(rename('plunge.min.js'))
  .pipe(gulp.dest('dist'));
})
