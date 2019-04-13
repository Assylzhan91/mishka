const gulp         = require("gulp"),
      concat       = require("gulp-concat"),
      sass         = require("gulp-sass"),
      autoprefixer = require("gulp-autoprefixer"),
      cleanCSS     = require("gulp-clean-css"),
      browserSync  = require('browser-sync').create();



const allCssFile = [
    'node_modules/normalize.scss/normalize.scss',
    'src/css/common.scss'
];


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
    gulp.watch('index.html', browserSync.reload);


}



gulp.task("styles", styles);
gulp.task("watch", watch);


gulp.task("default", gulp.series("styles", "watch"));
