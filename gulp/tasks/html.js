import { path } from "../config/path.js";
import { appState } from "../config/appState.js";

import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpIf from 'gulp-if';

import fileinclude from 'gulp-file-include';
import webpHtmlNoSvg from "gulp-webp-html-nosvg";
import versionNumber from 'gulp-version-number'; 

import replace from 'gulp-replace';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';

export function html() {
    return gulp.src(path.src.html)
        .pipe(plumber(
            notify.onError({
                title: 'HTML',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(fileinclude())
        .pipe(replace(/@img\//g, './img/'))
        .pipe(webpHtmlNoSvg())
        .pipe(gulpIf(
            appState.isBuild,
            versionNumber({
                'value': '%DT%',
                'append': {
                    'key': '_v',
                    'cover': 0,
                    'to': [
                        'css',
                        'js',
                    ]
                },
                'output': {
                    'file': 'gulp/version.json'
                }
            })
        ))
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.stream());
}