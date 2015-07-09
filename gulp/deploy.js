var gulp = require('gulp');
var zip = require('gulp-zip');
var clean = require('gulp-clean');

gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('deploy', ['clean'], function(){
	return gulp.src('**/*')
		.pipe(zip('archive.zip'))
		.pipe(gulp.dest('dist'))
});