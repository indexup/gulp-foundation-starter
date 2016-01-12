var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var cssnano = require('gulp-cssnano');
var htmlmin = require('gulp-htmlmin');
var minify = require('gulp-minify');


var port = 5555;
var buildDir = 'build';


gulp.task('default', ['styles'])

gulp.task('styles', function () {
    gulp.src(['scss/main.scss','scss/_main_settings.scss','scss/app.scss'])
        .pipe(sass())
        .pipe(concat('app.css'))
        .pipe(cssnano())
        .pipe(gulp.dest(buildDir+'/css'))
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src(['static/*.html'])
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(buildDir+'/'))
        .pipe(connect.reload());
});

gulp.task('js', function () {
    gulp.src(['js/*.js'])
        .pipe(minify())
        .pipe(gulp.dest(buildDir + '/js'))
        .pipe(connect.reload());
});

gulp.task('reload', function () {
    gulp.src([buildDir+'/*'])
        .pipe(connect.reload());
});

gulp.task('webserver', function () {
    connect.server({
        port: port,
        root: buildDir,
        livereload: true
    });
});

gulp.task('default', ['html','styles','js', 'webserver', 'watch']);

gulp.task('watch', function () {
    gulp.watch('scss/*.scss', ['styles']);
    gulp.watch('static/*.html', ['html']);
    gulp.watch('js/*.js', ['js']);
})
