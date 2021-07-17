let project_folder = require("path").basename(__dirname);
let source_folder = "src";

let path = {
    build: {
       html: project_folder + "/",
       css: project_folder + "/css/",
       js: project_folder + "/js/",
       img: project_folder + "/img/",
       fonts: project_folder + "/fonts/"
    },
    src: {
       html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
       css: source_folder + "/scss/style.scss",
       js: source_folder + "/js/script.js",
       js_min: source_folder + "/js/scripts/**/*.min.js",
       img: source_folder + "/img/**/*.+(png|jpg|gif|ico|webp|svg)",
       sprite: source_folder + "/svg/*.svg",
       fonts: source_folder + "/fonts/**/*.ttf"
    },
    watch: {
       html: source_folder + "/*.html",
       css: source_folder + "/scss/**/*.scss",
       js: source_folder + "/js/**/*.js",
       img: source_folder + "/img/**/*.+(png|jpg|gif|ico|webp|svg)",
       sprite: source_folder + "/svg/*.svg"
    },
    clean: "./" + project_folder + "/"
}

let { src, dest } = require("gulp"),
   gulp = require("gulp"),
   browsersync = require("browser-sync").create();
   fileinclude = require("gulp-file-include"),
   del = require("del"),
   scss = require("gulp-sass"),
   autoprefixer = require("gulp-autoprefixer"),
   group_media = require("gulp-group-css-media-queries"),
   clean_css = require("gulp-clean-css"),
   rename = require("gulp-rename"),
   uglify = require("gulp-uglify-es").default,
   imagemin = require("gulp-imagemin"),
   webp = require("gulp-webp"),
   webphtml = require("gulp-webp-html"),
   webpcss = require("gulp-webpcss"),
   svgSprite = require("gulp-svg-sprite"),
   svgmin = require('gulp-svgmin'),
   cheerio = require('gulp-cheerio'),
   replace = require('gulp-replace'),
   ttf2woff = require("gulp-ttf2woff"),
   ttf2woff2 = require("gulp-ttf2woff2");

function browserSync(params) {
   browsersync.init({
       server: {
           baseDir: "./" + project_folder + "/"
       },
       port: 3000,
       notify: true
   })
}

function html() {
   return src(path.src.html)
       .pipe(fileinclude())
       .pipe(webphtml())
       .pipe(dest(path.build.html))
       .pipe(browsersync.stream())
}

function js() {
   return src(path.src.js)
       .pipe(fileinclude({
           prefix: "--"
       }))
       .pipe(dest(path.build.js))
       .pipe(uglify())
       .pipe(
           rename({
               extname: ".min.js"
           })
       )
       .pipe(dest(path.build.js))
       .pipe(browsersync.stream())
}

function js_min() {
   return src(path.src.js_min)
       .pipe(dest(path.build.js))
}

function css() {
   return src(path.src.css)
       .pipe(
           scss({
               outputStyle: "expanded"
           })
       )
       .pipe(group_media())
       .pipe(
           autoprefixer({
               overrideBrowserslist: ["last 5 versions"],
               cascade: true
           })
       )
       .pipe(webpcss({
           baseClass: ".webp-support" 
       })) 
       .pipe(dest(path.build.css))
       .pipe(clean_css())
       .pipe(
           rename({
               extname: ".min.css"
           })
       )
       .pipe(dest(path.build.css))
       .pipe(browsersync.stream())
}

function images() {
   return src(path.src.img)
       .pipe(
           webp({
               quality: 95
           })
       )
       .pipe(dest(path.build.img))
       .pipe(src(path.src.img))
       .pipe(
           imagemin({
               progressive: true,
               interlaced: true,
               optimizationLevel: 3 // 0 to 7
           })
       )
       .pipe(dest(path.build.img))
       .pipe(browsersync.stream())
}

function fonts(params) {
   src(path.src.fonts)
       .pipe(ttf2woff())
       .pipe(dest(path.build.fonts));
   return src(path.src.fonts)
       .pipe(ttf2woff2())
       .pipe(dest(path.build.fonts));
}

function watchFiles(params) {
   gulp.watch([path.watch.html], html);
   gulp.watch([path.watch.css], css);
   gulp.watch([path.watch.js], js);
   gulp.watch([path.watch.img], images);
   gulp.watch([path.watch.sprite], sprite);
}

function clean(params) {
   return del(path.clean);
}

function sprite(params) {
    return src(path.src.sprite)
	// minify svg

		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))

		// remove all fill, style and stroke declarations in out shapes

		.pipe(cheerio({
			run: function ($) {

                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');

				// $('[fill]').attr('fill', 'currentColor');
                // $('[stroke]').attr('stroke', 'currentColor');
				// $('[style]').removeAttr('style');

                // const tags = ["fill", "stroke"];

                // $("path").each(function() {
                //     let count = 0;
                //     tags.forEach(item => {
                //         if ($(this).attr(item) === undefined) {
                //             count++;
                //             $(this).attr(item, "transparent");
                //         }

                //         if (count === tags.length) { // если в одном <path> одновременно нет ни fill, ни stroke
                //             tags.forEach(item => {
                //                 $(this).removeAttr(item); // удаляем их от туда
                //             });
                //         }
                //     });
                // });

                //console.log($("svg").html());
                
			},
			parserOptions: {xmlMode: true}
		}))

		// cheerio plugin create unnecessary string '&gt;', so replace it.
		.pipe(replace('&gt;', '>'))
		// build svg sprite
		.pipe(svgSprite({
            preview: {
                sprite: "index.html"
            },
			mode: {
				symbol: {
					sprite: "../sprite.svg",
					render: {
						scss: {
							dest: '../../../' + source_folder + '/scss/sprite/_icons.scss',
							template: source_folder + "/scss/sprite/_icons.template"
						}
					},
                    example: true
				}
			}
		}))
		.pipe(dest(path.build.img));
}
let build = gulp.series(clean, js_min, gulp.parallel(js, css, html, images, fonts, sprite));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.sprite = sprite;
exports.build = build;
exports.watch = watch;
exports.default = watch;