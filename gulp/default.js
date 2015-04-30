var gulp   = require( 'gulp' );

gulp.task( 'default', [ 'dbcheck', 'build', 'server:start' ]);