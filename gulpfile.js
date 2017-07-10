


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
    karma = require('gulp-karma'),
    pug = require('gulp-pug'),
    gulpif = require('gulp-if'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin'),
    useref = require('gulp-useref'),
    clean = require('gulp-clean'),
    livereload = require('gulp-livereload'),
    //// jshint = require('gulp-jshint'),
    //// stylish = require('jshint-stylish'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-clean-css'),
    browser_Sync = require('browser-sync').create(); // create a browser sync instance.
    cssnano = require('gulp-cssnano');
    var karmaServer = require('karma').Server;


var sourceDir = './public_development';
var destinationDir = './public';




if (!fs.existsSync(sourceDir)) {
    fs.mkdirSync(sourceDir);
}

livereload({ start: true });


gulp.task('styles', function () {

    var scssStream = gulp.src('public_development/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(concat('scss-files.scss'))
        ;

    var cssStream = gulp.src('public_development/css/**/*.css')
        .pipe(concat('css-files.css'))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        ;
    var mergedStream = merge(scssStream,cssStream)
        .pipe(concat('styles.min.css'))
        .pipe(cssnano())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(gulp.dest('public/css'));

    return mergedStream;
});

gulp.task('images', function () {
    return gulp.src('public_development/images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin())
        .pipe(gulp.dest('public/images')));
});

gulp.task('js', function () {

    gulp.src('public_development/js/*.js')
        .pipe(minify({
            ext: {
                src: '.min.js',
                min: '.min.js'
            },
            exclude: ['tasks'],
            ignoreFiles: []
        }))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulp.dest('public/js/'));
    console.log('Files and folders that would be deleted ');
});


gulp.task('views', function buildHTML() {
    return gulp.src('public_development/**/*.html')
        .pipe(useref())
        .pipe(gulp.dest('public/'));
});

gulp.task('browser-sync', function () {
    browser_Sync.init({
        server: {
            baseDir: 'public/'
        },
       /* proxy: {
        target: "localhost:8080", // can be [virtual host, sub-directory, localhost with port]
        ws: true // enables websockets
    }*/

    });
});

gulp.task('LiveServe', function(done) {
  var express = require('express');
  var app = express();
  app.use(express.static(__dirname + '/public'));
  app.listen(5000, function () {
     done();
  });
});

gulp.task('watch', ['browser-sync', 'styles', 'ng', 'js','images'], function () {
    gulp.watch('public_development/scss/**/*.scss', ['styles']);
    gulp.watch('public_development/css/**/*.css', ['styles']);
    gulp.watch('public_development/ng/**/*', ['ng']);
    gulp.watch('public_development/images/**/*', ['images']);
    gulp.watch('public_development/**/*.html', ['views']);
    gulp.watch('public_development/js/lib/*.js', ['jquery-concat']);
    gulp.watch('public_development/**/*', browser_Sync.reload);
    livereload.listen();

});

gulp.task('ng', function () {
    console.log("ng is updating");
    return gulp.src('public_development/ng/**/*')
        .pipe(gulp.dest('public/ng'))
        .pipe(livereload());
});

/*
gulp.task('jshint', function(){
  return gulp.src('app/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});
*/

gulp.task('jquery-concat', function() {
  return gulp.src(['public_development/js/lib/*.js','public_development/js/lib/*.js'])
    .pipe(uglify())
    .pipe(concat('all-plugins.js'))
    .pipe(rename("all-plugins.min.js"))
    .pipe(gulp.dest('public/js/lib'));
});



gulp.task('clean:destination', function () {
    return del.sync([
    'public/css',
    'public/images',
    'public/js',
    'public/ng',
    '!public/bower.json',
    '!public/bower_component'
    ]);
});

// gulpfile.js
gulp.task('test', function (done) {
  return new karmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('build', function (callback) {
    console.log('Building project...');
    runSequence('clean:destination', ['styles', 'js', 'ng','images','jquery-concat'],
        callback
    );

});

gulp.task('clean-public', function () {
    return gulp.src('public_development/')
        .pipe(clean({force: true}))
        .pipe(gulp.dest('public/'));
});

gulp.task('default', function (callback) {
    runSequence(['styles', 'js', 'ng', 'watch','browser-sync','images','jquery-concat','LiveServe','test'],
        callback
    );
});


