
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var autoprefixer = require('gulp-autoprefixer');
var order = require("gulp-order");
var rigger = require('gulp-rigger');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('sass', function(){
	return gulp.src('src/css/sass/*.scss')
	.pipe(sass())
	.pipe(autoprefixer({
		browsers: ['last 10 versions', '> 2%'],
		cascade: false
	}))
	.pipe(gulp.dest('dist/css'));
});

gulp.task('concat-css', function(){
	 return gulp.src('src/css/*.css')
    .pipe(concatCss("default.css"))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('watch', function() {
	gulp.watch('src/css/sass/*.scss', ['sass']);
	gulp.watch('src/css/*.css', ['concat-css']);
});

gulp.task('default', ['sass', 'watch', 'concat-css']);