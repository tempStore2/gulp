var gulp = require("gulp");
var jade = require("gulp-jade");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");

gulp.task("copyHTML", function () {
  return gulp.src("./source/**/*.html").pipe(gulp.dest("./public/"));
});

gulp.task("jade", function () {
  //   var YOUR_LOCALS = {};

  gulp
    .src("./source/**/*.jade")
    .pipe(plumber())
    .pipe(
      jade({
        // locals: YOUR_LOCALS,
      })
    )
    .pipe(gulp.dest("./public/"));
});

gulp.task("sass", function () {
  return (
    gulp
      .src("./source/scss/**/*.scss")
      .pipe(plumber())
      .pipe(sass().on("error", sass.logError))
      // 編譯完css
      .pipe($.postcss([autoprefixer()]))
      .pipe(gulp.dest("./public/css"))
  );
});

gulp.task("watch", function () {
  return gulp.watch("./source/scss/**/*.scss", gulp.series("sass"));
});

// gulp.task("watch", function () {
//   return gulp.watch("./source/**/*.jade", gulp.series("jade"));
// });

gulp.task("default", gulp.parallel("jade", "sass", "watch"));
