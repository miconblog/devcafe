var gulp = require('gulp');
var zip = require('gulp-zip');

gulp.task('deploy', function(){
	return gulp.src('**/*')
		.pipe(zip('archive.zip'))
		.pipe(gulp.dest('dist'))
});