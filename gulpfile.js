import gulp from 'gulp';
import del from 'del';
import browserSync from 'browser-sync';

import { path } from './gulp/config/path.js';
import { html } from './gulp/tasks/html.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { zip } from './gulp/tasks/zip.js';
import { otfToTtf, ttfToWoff, moveToFontsBuild, fontsCopy, fontsStyle } from './gulp/tasks/fonts.js';

function copy() {
    return gulp.src(path.src.files)
        .pipe(gulp.dest(path.build.files));
}

function server(done) {
    browserSync.init({
        server: {
            baseDir: `${path.build.html}`
        },
        notify: true,
        port: 3000,
    });
}

function reset() {
    return del(path.clean); 
}

function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

const fontsBuild = gulp.series(otfToTtf, ttfToWoff, moveToFontsBuild);
const fonts = gulp.series(fontsCopy, fontsStyle);
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

const deployZip = gulp.series(reset, mainTasks, zip);

export {dev, build, fontsBuild, deployZip} // для задачек (тип npm run fonts (будет запущена команда gulp fonts))

gulp.task('default', dev);