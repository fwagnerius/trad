var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');

gulp.task('connect', function(){
	connect.server({
		root: './',
		port: 1337,
		livereload: true
	});
});

gulp.task('sass', function(){
	gulp.src('./source/scss/**/*.scss')

		.pipe(sass.sync().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(gulp.dest('./dist/css'))
		.pipe(connect.reload());
});

gulp.task('html', function(){
    gulp.src('./source/index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./'))
        .pipe(connect.reload());
});

gulp.task('compress', function(){
    gulp.src(['./source/js/vendor/jquery.min.js', './source/js/main.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'))
    .pipe(connect.reload());
});

gulp.task('watch', function(){
	gulp.watch('source/scss/**/*.scss', ['sass']);
    gulp.watch('./**/*.html', ['html']);
    gulp.watch('source/js/**/*.js', ['compress']);
});

gulp.task('default', ['connect', 'html', 'sass', 'compress', 'watch']);
