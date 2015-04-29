var gulp = require('gulp');
var watchFiles = [
  './server/bin/www',
  './server/server.js',
  './server/routes.js',
  './server/app/**/*.js',
  './server/libs/**/*.js',
  './server/views/**/*.hbs',
  './flux/components/*.jsx',
  './flux/**/*.js',
  './client/css/*.css',
  './client/js/*.js'
];

gulp.task('build', ['browserify', 'styles' /** 'html' */], function() {

  gulp.watch( watchFiles, [ 'server:restart' ] )

});
