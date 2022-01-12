import { path } from "../config/path.js";
import gulp from 'gulp';
import { appState } from "../config/appState.js";
import browserSync from 'browser-sync';
import gulpIf from 'gulp-if';

import dartSass from 'sass';
import gulpSass from 'gulp-sass';

import replace from 'gulp-replace';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import rename from "gulp-rename";

import cleanCss from 'gulp-clean-css'; // Сжатие CSS файла
import webpcss from 'gulp-webpcss'; // Вывод WEBP картинок
import autoPrefixer from 'gulp-autoprefixer'; // Добавление префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries' // Группировка медиа запросов

const sass = gulpSass(dartSass);

export function scss() {
    return gulp.src(path.src.scss, {sourcemaps: appState.isDev})
        .pipe(plumber(
            notify.onError({
                title: 'SCSS',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(replace(/@img\//g, '../img/'))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(gulpIf(
            appState.isBuild,
            groupCssMediaQueries()
        ))
        .pipe(gulpIf(
            appState.isBuild,
            webpcss({
                webpClass: '.webp',
                noWebpClass: '.no-webp'
            })
        ))
        .pipe(gulpIf(
            appState.isBuild,
            autoPrefixer({
                grid: true,
                overrideBrowserlist: ['last 3 versions'],
                cascade: true
            })
        ))
        // Закоментить если не нужен обычный style.css (не min)
        .pipe(gulp.dest(path.build.css, {sourcemaps: appState.isDev}))
        .pipe(gulpIf(
            appState.isBuild,
            cleanCss()
        ))
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(gulp.dest(path.build.css, {sourcemaps: appState.isDev}))
        .pipe(browserSync.stream());
}