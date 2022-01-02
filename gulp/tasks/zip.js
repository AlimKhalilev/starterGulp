import { path } from "../config/path.js";
import gulp from 'gulp';
import del from 'del';

import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import GulpZip from "gulp-zip";

export function zip() {
    del(`./${path.rootFolder}.zip`);
    return gulp.src(`${path.buildFolder}/**/*.*`, {})
    .pipe(plumber(
        notify.onError({
            title: 'ZIP',
            message: 'Error: <%= error.message %>'
        })
    ))
    .pipe(GulpZip(`${path.rootFolder}.zip`))
    .pipe(gulp.dest('./'))
}