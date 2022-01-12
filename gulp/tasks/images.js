import { path } from "../config/path.js";
import { appState } from "../config/appState.js";
import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpIf from 'gulp-if';

import plumber from 'gulp-plumber';
import notify from 'gulp-notify';

import webp from 'gulp-webp'
import imagemin from "gulp-imagemin";
import newer from "gulp-newer";

export function images() {
    return gulp.src(path.src.images)
    .pipe(plumber(
        notify.onError({
            title: 'IMAGES',
            message: 'Error: <%= error.message %>'
        })
    ))
    .pipe(newer(path.build.images))
    .pipe(webp())
    .pipe(gulp.dest(path.build.images))
    .pipe(gulp.src(path.src.images))
    .pipe(newer(path.build.images))
    .pipe(gulpIf(
        appState.isBuild,
        imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true,
            optimizationLevel: 3 // 0 to 7
        })
    ))
    .pipe(gulp.dest(path.build.images))
    .pipe(gulp.src(path.src.svg))
    .pipe(gulp.dest(path.build.images))
    .pipe(browserSync.stream());
}