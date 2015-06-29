var gulp = require('gulp');
gulp.task('build', ['styles', 'browserify']);
gulp.task('build-ci', ['styles', 'browserify'], function(done){

  process.exit(1);

});
