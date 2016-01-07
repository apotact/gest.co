var gulp         = require('gulp')
var path         = require('path')
var less         = require('gulp-less')
var autoprefixer = require('gulp-autoprefixer')
var sourcemaps   = require('gulp-sourcemaps')
var minifyCSS    = require('gulp-minify-css')
var rename       = require('gulp-rename')
var concat       = require('gulp-concat')
var uglify       = require('gulp-uglify')
var connect      = require('gulp-connect')
var open         = require('gulp-open')
var deploy       = require('gulp-deploy-git')
var handlebars	 = require('gulp-compile-handlebars');
var debug 			 = require('gulp-debug');
var del 				 = require('del');
 
var Paths = {
  HERE                 : './',
	PARTIALS						 : ['src/partials/'], // Array of directories of partials
	ASSETS							 : 'src/assets/**/*',
	PAGES 						   : 'src/*.hbs',
  DIST                 : 'dist',
  DIST_TOOLKIT_JS      : 'dist/toolkit.js',
  LESS_TOOLKIT_SOURCES : 'src/less/toolkit*',
  LESS                 : 'src/less/**/**',
  JS                   : [
      'src/js/bootstrap/transition.js',
      'src/js/bootstrap/alert.js',
      'src/js/bootstrap/affix.js',
      'src/js/bootstrap/button.js',
      'src/js/bootstrap/carousel.js',
      'src/js/bootstrap/collapse.js',
      'src/js/bootstrap/dropdown.js',
      'src/js/bootstrap/modal.js',
      'src/js/bootstrap/tooltip.js',
      'src/js/bootstrap/popover.js',
      'src/js/bootstrap/scrollspy.js',
      'src/js/bootstrap/tab.js',
      'src/js/custom/*'
    ]
}

gulp.task('default', ['compile', 'less-min', 'js-min'])

gulp.task('watch', function () {
// TODO: update watch 
  gulp.watch(Paths.LESS, ['less-min']);
  gulp.watch(Paths.JS,   ['js-min']);
	gulp.watch(Paths.PARTIALS, ['compile']);
	gulp.watch(Paths.PAGES, ['compile']);
	gulp.watch(Paths.ASSETS, ['compile', 'cp:assets']);
})

gulp.task('view', ['server'], function () {
  gulp.src(__filename)
    .pipe(open({uri: 'http://localhost:9001/'}))
})

gulp.task('server', ['watch'], function () {
  connect.server({
    root: 'dist',
    port: 9001,
    livereload: true
  })
})

gulp.task('less', function () {
  return gulp.src(Paths.LESS_TOOLKIT_SOURCES)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(gulp.dest(Paths.DIST+'/css'))
})

gulp.task('less-min', ['less'], function () {
  return gulp.src(Paths.LESS_TOOLKIT_SOURCES)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(autoprefixer())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(gulp.dest(Paths.DIST+'/css'))
})

gulp.task('js', function () {
  return gulp.src(Paths.JS)
    .pipe(concat('toolkit.js'))
    .pipe(gulp.dest(Paths.DIST+'/js'))
})

gulp.task('js-min', ['js'], function () {
  return gulp.src(Paths.DIST_TOOLKIT_JS)
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(Paths.DIST+'/js'))
})

/* move assets that don't need to be compiled, like images and fonts and
 compiled sources */
gulp.task('cp:assets', function() {
	return gulp.src(Paths.ASSETS)
		.pipe(gulp.dest(Paths.DIST))
});

gulp.task('clean', function() {
	return del([Paths.DIST]);
});

gulp.task('compile', ['less-min', 'js-min', 'cp:assets'], function () {
	var templateOptions = {
		batch: Paths.PARTIALS
	}

	return gulp.src(Paths.PAGES)
		.pipe(debug({title: 'templates'}))
		.pipe(handlebars({}, templateOptions))
		.pipe(rename({
			extname: '.html'
		}))
		.pipe(gulp.dest('dist'));
});


gulp.task('test-deploy', ['compile'], function() {
	return gulp.src('dist/**/*')
		.pipe(deploy({
			repository: 'git@github.com:apotact/gest.co-staging.git',
			prefix: 'dist',
			verbose: true,
			debug: true
			}));
});

gulp.task('deploy', ['compile'], function() {
	return gulp.src('dist/**/*')
		.pipe(deploy({
			repository: 'getgest@banks.dreamhost.com:gest.git',
			prefix: 'dist',
			verbose: false
			}));
});
