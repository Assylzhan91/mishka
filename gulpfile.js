const gulp         = require("gulp"),
      concat       = require("gulp-concat"),
      sass         = require("gulp-sass"),
      autoprefixer = require("gulp-autoprefixer"),
      cleanCSS     = require("gulp-clean-css"),
      polyfiller   = require("gulp-autopolyfiller"),
      uglify       = require("gulp-uglify"),
      browserSync  = require('browser-sync').create();



const allCssFile = [
    'node_modules/normalize.css/normalize.css',
    'src/css/common.scss'
];


function js() {

    return   gulp.src("src/js/**/*.js")
        // .pipe(polyfiller('javascript.js'))
        .pipe(uglify())
        .pipe(gulp.dest("js/"))
        .pipe(browserSync.stream());
}

function styles() {

    return gulp.src(allCssFile)
    // .pipe(concat("all.css"))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['ie >= 8', 'last 4 version'],
            cascade: true
        }))
        /* .pipe(cleanCSS({
         level: 2
         }))*/
        .pipe(gulp.dest("build/css"))
        .pipe(browserSync.stream());
}

function watch() {


    browserSync.init({
        server: {
            baseDir: "./",
            index: "index.html"
        },
        browser: ["chrome"]
        // tunnel: "my-project"
    });

    gulp.watch('src/css/**/*.scss', styles);
    gulp.watch('src/js/**/*.js', js);
    gulp.watch('index.html', browserSync.reload);
}



gulp.task("styles", styles);
gulp.task("js", js);
gulp.task("watch", watch);


gulp.task("default", gulp.series("styles", "js", "watch"));
