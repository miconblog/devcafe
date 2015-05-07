var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var config = {
  settings: {
    transform: ['reactify', 'babelify']
  },
  src: './flux/user.jsx',
  dest: './client/js',
  outputName: 'user-bundle.js'
};

var bundler = watchify(browserify(config.src, watchify.args));
config.settings.transform.forEach(function(t) {
  bundler.transform(t);
});

gulp.task('browserify-user', bundle);
bundler.on('update', bundle);

function bundle() {
  return bundler.bundle()
  // log errors if they happen
  .on('error', gutil.log.bind(gutil, 'Browserify Error'))
  .pipe(source(config.outputName))
  .pipe(gulp.dest(config.dest))
}
