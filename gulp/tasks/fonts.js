import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';
import del from 'del';

import { path } from "../config/path.js";
import gulp from 'gulp';

import plumber from 'gulp-plumber';
import notify from 'gulp-notify';

// *** https://bestfonts.pro (ссылка на бесплатные шрифты (10.2021)) ***

export function otfToTtf() {
    return gulp.src(`${path.srcFolder}/fonts/*.otf`, {})
    .pipe(plumber(
        notify.onError({
            title: 'FONTS',
            message: 'Error: <%= error.message %>'
        })
    ))
    .pipe(fonter({
        formats: ['ttf']
    }))
    .pipe(gulp.dest(`${path.srcFolder}/fonts/`))
}

export function ttfToWoff() {
    del(`${path.srcFolder}/fontsBuild`)
    return gulp.src(`${path.srcFolder}/fonts/*.ttf`, {})
    .pipe(plumber(
        notify.onError({
            title: 'FONTS',
            message: 'Error: <%= error.message %>'
        })
    ))
    .pipe(fonter({
        formats: ['woff']
    }))
    .pipe(gulp.dest(`${path.build.fonts}`))
    .pipe(gulp.src(`${path.srcFolder}/fonts/*.ttf`))
    .pipe(ttf2woff2())
    .pipe(gulp.dest(`${path.srcFolder}/fontsBuild/`))
}

export function moveToFontsBuild() {
    return gulp.src(`${path.srcFolder}/fonts/*.{woff,woff2}`, {})
    .pipe(gulp.dest(`${path.srcFolder}/fontsBuild/`))
}

export function fontsCopy() {
    return gulp.src(`${path.srcFolder}/fontsBuild/*.{woff,woff2}`, {})
    .pipe(gulp.dest(`${path.build.fonts}`))
}

export function fontsStyle() {
    let fontsFile = `${path.srcFolder}/scss/lib/_fonts.scss`;

    fs.readdir(path.build.fonts, function(err, fontsFiles) {
        if (fontsFiles) {
            // if (!fs.existsSync(fontsFile)) {
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;
                for (let i = 0; i < fontsFiles.length; i++) {
                    let fontFileName = fontsFiles[i].split('.')[0];
                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                        let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                        if (fontWeight.toLowerCase() == 'thin') {
                            fontWeight = 100;
                        }
                        else if (fontWeight.toLowerCase() === 'extralight') {
                            fontWeight = 200;
                        }
                        else if (fontWeight.toLowerCase() === 'light') {
                            fontWeight = 300;
                        }
                        else if (fontWeight.toLowerCase() === 'medium') {
                            fontWeight = 500;
                        }
                        else if (fontWeight.toLowerCase() === 'semibold') {
                            fontWeight = 600;
                        }
                        else if (fontWeight.toLowerCase() === 'bold') {
                            fontWeight = 700;
                        }
                        else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
                            fontWeight = 800;
                        }
                        else if (fontWeight.toLowerCase() === 'black') {
                            fontWeight = 900;
                        }
                        else {
                            fontWeight = 400;
                        }

                        fs.appendFile(fontsFile,
                            `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url('../fonts/${fontFileName}.woff2') format('woff2'), url('../fonts/${fontFileName}.woff') format('woff');\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
                            newFileOnly = fontFileName;
                    }
                }
            // }
            // else {
            //    console.log("Файл scss/fonts.scss уже существует! Для обновления файла удалите его!");
            // }
        }
    });

    return gulp.src(`${path.srcFolder}`)
    function cb() {}
}