import { path } from "../config/path.js";
import { appState } from "../config/appState.js";
import gulp from 'gulp';
import browserSync from 'browser-sync';

import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import webpack from 'webpack-stream';

export function js() {
    
    return gulp.src(path.src.js, {sourcemaps: appState.isDev})
    .pipe(plumber(
        notify.onError({
            title: 'JS',
            message: 'Error: <%= error.message %>'
        })
    ))
    .pipe(webpack({
        mode: (appState.isBuild ? 'production' : 'development'),
        output: {
            filename: 'app.min.js'
        }
    }))
    .pipe(gulp.dest(path.build.js, {sourcemaps: appState.isDev}))
    .pipe(browserSync.stream());
}