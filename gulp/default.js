var gulp   = require( 'gulp' );
var serverFiles = [
  './server/bin/www',
  './server/server.js',
  './server/routes/**/*.js',
  './server/app/**/*.service.js',
  './server/app/**/*.controller.js',
  './server/libs/**/*.js',
  './server/api/**/*.js',
  './server/views/**/*.hbs'
];

var modelFiles= [ './server/app/**/*.model.js' ];
var lessFiles = [ './public/less/**/*.less' ];
var fluxFiles = [ './flux/**/*.{js,jsx}' ];

gulp.task( 'default', ['dbcheck','build'], function(){
  gulp.start('server:start');
  gulp.watch( serverFiles, [ 'server:restart' ] );
  gulp.watch( modelFiles, [ 'seeds', 'server:restart' ] );
  gulp.watch( fluxFiles, [ 'browserify','server:restart' ] );
  gulp.watch( lessFiles, [ 'styles', 'browser:reload' ] );

});