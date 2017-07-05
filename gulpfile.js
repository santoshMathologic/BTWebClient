/**
 *         GULP 
 *          @author santosh
 *          @since 2017
 * 
 */


' use strict';
var fs = require('fs'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    merge = require('merge-stream'),
    runSequence = require('run-sequence'),
    minify = require('gulp-minify'),
    del = require('del'),
    pug = require('gulp-pug'),
    gulpif = require('gulp-if'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin'),
    useref = require('gulp-useref'),
    clean = require('gulp-clean'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-clean-css'),
    browser_Sync = require('browser-sync').create(); // create a browser sync instance.
    cssnano = require('gulp-cssnano');



var sourceDir = './public_development';
var destinationDir = './public';

var inputPath = 'public_development';  // eg.: src  or  src/html
var outputPath = 'public';  // eg.: dist  or public/html
var inputActPath = inputPath + "/";
var outputActPath = outputPath + "/";


if (!fs.existsSync(sourceDir)) {
    fs.mkdirSync(sourceDir);
}


gulp.task('styles', function () {

    var scssStream = gulp.src(inputActPath + 'scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(concat('scss-files.scss'))
        ;

    var cssStream = gulp.src(inputActPath + 'css/**/*.css')
        .pipe(concat('css-files.css'))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        ;
    var mergedStream = merge(scssStream,cssStream)
        .pipe(concat('styles.min.css'))
        .pipe(cssnano())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(gulp.dest(outputActPath + 'css'));

    return mergedStream;
});

gulp.task('images', function () {
    return gulp.src(inputActPath + 'images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest(outputActPath +'images'));
});

gulp.task('js', function () {

    gulp.src(inputActPath + 'js/*.js')
        .pipe(minify({
            ext: {
                src: '.min.js',
                min: '.min.js'
            },
            exclude: ['tasks'],
            ignoreFiles: []
        }))
        .pipe(gulpif('*.js', uglify()))

        .pipe(gulp.dest(outputActPath + 'js/'));
    console.log('Files and folders that would be deleted:\n');
});


gulp.task('views', function buildHTML() {
    return gulp.src(inputActPath + '*.html')
        .pipe(useref())
        .pipe(gulp.dest(outputActPath));
});

gulp.task('browser-sync', function () {
    browser_Sync.init({
        server: {
            baseDir: outputActPath
        },
       /* proxy: {
        target: "localhost:8080", // can be [virtual host, sub-directory, localhost with port]
        ws: true // enables websockets
    }*/

    });
});


gulp.task('watch', ['browser-sync', 'styles', 'ng', 'js'], function () {
    gulp.watch(inputActPath + 'scss/**/*.scss', ['styles']);
    gulp.watch(inputActPath + 'css/**/*.css', ['styles']);
    gulp.watch(inputActPath + 'ng/**/*', ['ng']);
    gulp.watch(inputActPath + '/**/*.html', ['views']);
    gulp.watch(inputActPath + '**/*', browser_Sync.reload);

});

gulp.task('ng', function () {
    console.log("ng is updating");
    return gulp.src(inputActPath + 'ng/**/*')
        .pipe(gulp.dest(outputActPath + 'ng'));
});


gulp.task('clean:dist', function () {
    return del.sync(outputActPath);
});

gulp.task('build', function (callback) {
    console.log('Building project...');
    runSequence('clean:dist', ['styles', 'js', 'ng','images'],
        callback
    );

});

gulp.task('clean-public', function () {
    return gulp.src(inputActPath)
        .pipe(clean({force: true}))
        .pipe(gulp.dest(outputActPath));
});

gulp.task('default', function (callback) {
    runSequence(['styles', 'js', 'ng', 'watch', 'browser-sync','images'],
        callback
    );
});


