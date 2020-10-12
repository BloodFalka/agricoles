"use strict";

const gulp = require("gulp");
const webpack = require("webpack-stream");
const browserSync = require("browser-sync");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");

const dist = "./dist/";
//const dist = '../../../../MAMP/htdocs/test/';

gulp.task("html", function () {
  return gulp
    .src("./src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(dist));
});

gulp.task("styles", function () {
  return gulp
    .src("src/sass/**/*.+(scss|sass)")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

gulp.task("build-js", () => {
  return gulp
    .src("./src/js/main.js")
    .pipe(
      webpack({
        mode: "development",
        output: {
          filename: "script.js",
        },
        watch: false,
        devtool: "source-map",
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        debug: true,
                        corejs: 3,
                        useBuiltIns: "usage",
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(gulp.dest(dist))
    .on("end", browserSync.reload);
});

// gulp.task("copy-assets", () => {
//   return gulp
//     .src("./src/assets/**/*.*")
//     .pipe(gulp.dest(dist + "/assets"))
//     .on("end", browserSync.reload);
// });

gulp.task("watch", () => {
  browserSync.init({
    server: "./dist/",
    port: 4000,
    notify: true,
  });

  gulp.watch("./src/*.html", gulp.parallel("html"));
  gulp.watch("./src/sass/**/*.+(scss|sass|css)", gulp.parallel("styles"));
  gulp.watch("./src/assets/fonts/**/*", gulp.parallel("fonts"));
  gulp.watch("./src/assets/**/*.php", gulp.parallel("php"));
  gulp.watch("./src/assets/img/**/*", gulp.parallel("images"));
  gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task("fonts", function () {
  return gulp
    .src("./src/assets/fonts/**/*")
    .pipe(gulp.dest(`${dist}assets/fonts`));
});

gulp.task("images", function () {
  return gulp
    .src("./src/assets/img/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest(`${dist}assets/img`));
});

gulp.task("php", function () {
  return gulp
    .src("./src/assets/**/*.php")
    .pipe(gulp.dest(`${dist}assets`));
});

gulp.task(
  "build",
  gulp.parallel(
    "html",
    // "copy-assets",
    "styles",
    "images",
    "php",
    "fonts",
    "build-js"
  )
);

gulp.task("build-prod-js", () => {
  return gulp
    .src("./src/js/main.js")
    .pipe(
      webpack({
        mode: "production",
        output: {
          filename: "script.js",
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        corejs: 3,
                        useBuiltIns: "usage",
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(gulp.dest(dist));
});

gulp.task("default", gulp.parallel("watch", "build"));
