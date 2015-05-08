var gulp   = require( 'gulp' );

gulp.task( 'default', ['dbcheck','build'], function(done){

  done();
  gulp.start('server:start');

});