var gulp = require('gulp');
var sass = require('gulp-sass');
//var connect = require('gulp-connect');
var config = {
  src: 'public/css/**/*.{sass,scss,css}',
  dest: 'public/css',
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
