require("@babel/register")
const gulp = require('gulp')
const sass = require('gulp-sass')
const sassGlob = require('gulp-sass-glob')
const path = require('path')
const flatten = require('gulp-flatten')
const reactRender = require('gulp-render-react')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const gls = require('gulp-live-server')
const rename = require("gulp-rename")
const replace = require('gulp-replace')
const htmlbeautify = require('gulp-html-beautify')
const inject = require('gulp-inject')
const clean = require('gulp-clean')

gulp.task('default', [
  'build-php',
  'build-sass',
  'copy-assets',
  'copy-crapp',
  'inject-scripts',
  'watch',
  'serve',
])

const paths = {
  components: path.join(__dirname, 'src/components/'),
  scss: path.join(__dirname, 'src/scss/'),
  assets: path.join(__dirname, 'src/assets/'),
  fengelCRApp: path.join(__dirname, 'fengel.com-crapp/'),
  public: path.join(__dirname, 'public/')
}

gulp.task('clean', function () {
  // return gulp.src(paths.public, {read: false})
  //   .pipe(clean());
});

gulp.task('build-php', ['clean'], () => {
  gulp.src(paths.components + 'pages/**/*.js')
    .pipe(reactRender({type: 'markup'}))
    .pipe(flatten())
    .pipe(rename(function (path) {
      path.extname = ".php";
    }))
    .pipe(replace('&lt;?', '<?'))
    .pipe(replace('?&gt;', '?>'))
    .pipe(replace('&lt;!--', '<!--'))
    .pipe(replace('--&gt;', '-->'))
    .pipe(replace('&lt;![', '<!['))
    .pipe(replace(']&gt;', ']>'))
    .pipe(htmlbeautify({indentSize: 2}))
    .pipe(gulp.dest(paths.public))
})



gulp.task('build-sass', ['clean'], () => {
  return gulp
    .src(paths.scss + '/styles.scss')
    .pipe(sassGlob())
    .on('error', onError)
    .pipe(
      sass({
        includePaths: [],
      })
    )
    .on('error', onError)
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false,
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.public + '/assets/css/'))
})

gulp.task('copy-assets', ['clean'], () => {
  gulp.src([ paths.assets + '**/*' ])
    .pipe(gulp.dest(paths.public))
})

gulp.task('copy-crapp', ['clean'], () => {
  gulp.src([ paths.fengelCRApp + 'build/static/**/*' ])
    .pipe(gulp.dest(paths.public + 'assets'))
})

gulp.task('inject-scripts', ['clean'], () => {
  var sources = gulp.src([paths.public + 'assets/**/*.js', paths.public + 'assets/**/*.css'], {read: false});
  setTimeout(() => {
    return gulp.src(paths.public + '*.php')
    .pipe(inject(sources, {ignorePath: 'public', addPrefix: '/wp-content/themes/wp-theme-fengelCRApp'}))
    .pipe(gulp.dest(paths.public))
  }, 5000)
  
})

gulp.task('serve', ['clean'], () => {
  var server = gls.static('public', 3000)
  server.start()
  gulp
    .watch(['public/**/*.css', 'public/*.html'], function(file) {
      server.notify(file).on('error', onError)
    })
    .on('error', onError)
})

gulp.task('watch', ['clean'], () => {
  gulp.watch(paths.scss + '**/*.scss', ['build-sass'])
  gulp.watch(paths.components + '**/*.scss', ['build-sass'])
  gulp.watch(paths.components + '**/*.js', ['build-php'])
  gulp.watch(paths.assets + '**/*.*', {cwd: './'}, ['copy-assets'])
})

function onError(error) {
  console.log("ERROR:", error.message)
  if (error.plugin) {
    console.log('Plugin: ' + error.plugin)
  }
  this.emit('end')
}