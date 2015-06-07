var gulp = require('gulp');
var serverFiles = [
  './server/bin/www',
  './server/server.js',
  './server/routes.js',
  './server/app/**/*.js',
  './server/libs/*.js',
  './server/views/**/*.hbs'
];

var lessFiles = [ './public/less/**/*.less' ];
var fluxFiles = [ './flux/**/*.{js,jsx}' ];

gulp.task('build', ['browserify', 'styles'], function() {

  gulp.watch( serverFiles, [ 'server:restart' ] );
  gulp.watch( fluxFiles, [ 'browserify','server:restart' ] );
  gulp.watch( lessFiles, [ 'styles', 'browser:reload' ] );

});
