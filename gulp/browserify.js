var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');

gulp.task('browserify', function() {
  gulp.src(['./flux/base.jsx'], { read: false })
    .pipe(browserify({
      transform: ['reactify', 'babelify']
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./public/js'))
});
