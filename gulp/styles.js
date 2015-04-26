var gulp = require('gulp');
var sass = require('gulp-sass');
//var connect = require('gulp-connect');
var config = {
  src: 'client/css/**/*.{sass,scss,css}',
  dest: 'client/css',
  settings: {
    indentedSyntax: false, // Enable .sass syntax?
    imagePath: '/images' // Used by the image-url helper
  }
};

gulp.task('styles', function() {
  gulp.src(config.src)
    .pipe(sass(config.settings))
    .pipe(gulp.dest(config.dest))
});
