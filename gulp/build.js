var gulp = require('gulp');
var watchFiles = [
  './server/bin/www',
  './server/server.js',
  './server/routes/*.js',
  './server/views/**/*.hbs',
  './components/*.jsx',
  './client/css/*.css',
  './client/js/*.js'
];

gulp.task('build', ['browserify', 'styles' /** 'html' */], function() {

  gulp.watch( watchFiles, [ 'server:restart' ] )

});
