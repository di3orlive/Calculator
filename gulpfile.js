var gulp = require('gulp'),
    util = require('gulp-util'),
    sass = require('gulp-sass'),
    uncss = require('gulp-uncss'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css'),
    fileinclude = require('gulp-file-include'),
    server = require('gulp-server-livereload'),
    autoprefixer = require('gulp-autoprefixer'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    fs = require('fs'),
    wiredep = require('wiredep').stream,
    log = util.log;



gulp.task('copy-bower', function () {
    gulp.src('./www/bower/**/*.*')
        .pipe(gulp.dest('./src/bower'));
});

gulp.task('bower', function () {
    gulp.src('./src/**/*.html')
        .pipe(wiredep({directory: './src/bower'}))
        .pipe(gulp.dest('./src/'));
});

gulp.task('sass', function () {
    log('============Generate CSS files============');
    gulp.src('./src/sass/all.sass')
        .pipe(sass({style: 'expanded'}))
        .pipe(concat('main.css'))
        .pipe(autoprefixer('last 3 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(gulp.dest('www/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('./www/css/min'));

    //.pipe(uncss({html: ['www/**/*.html']}))
});

gulp.task('js', function() {
    return gulp.src('./src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('www/js/'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./www/js/min/'));
});

gulp.task('webserver', function () {
    gulp.src('./www/')
        .pipe(server({
            livereload: true,
            port: 11111,
            open: './www/index.html',
            directoryListing: {
                enable: true,
                path: 'www'
            }
        })
    )
});

gulp.task('release', function () {
    var number = gutil.env.number;
    //gulp release --number 0.1 <<< example
    if (fs.existsSync('./releae/' + number)){
        return console.error('Number ' + number + ' already exists')
    }
    console.log('Making release ' + number + ' ');
    gulp.src('./www/**/*.*')
        .pipe(gulp.dest("./releases/" + number + '/'));
});

gulp.task('fileinclude', function() {
    gulp.src(['./src/**/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./www/'));
});

gulp.task('watch', function () {
    log('============Watching scss files for modifications============');
    gulp.watch('./src/**/*.html', ['fileinclude']);
    gulp.watch('./src/sass/**/*.sass', ['sass']);
    gulp.watch('./src/js/**/*.js', ['js']);
    gulp.watch('bower.json', ['bower']);
});

gulp.task('default', function () {
    gulp.run('copy-bower', 'bower', 'sass', 'js', 'watch', 'webserver');
});