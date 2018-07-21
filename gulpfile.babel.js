
import { src, dest, watch as watchSrc, parallel, series } from 'gulp'
import del from 'del'
import sass from 'gulp-sass'
import sassGlob from 'gulp-sass-glob'
import flatten from 'gulp-flatten'
import reactRender from 'gulp-render-react'
import autoprefixer from 'gulp-autoprefixer'
import sourcemaps from 'gulp-sourcemaps'
import gls from 'gulp-live-server'
import rename from 'gulp-rename'
import replace from 'gulp-replace'
import htmlbeautify from 'gulp-html-beautify'
import inject from 'gulp-inject'

const paths = {
  components: 'src/components/',
  scss: 'src/scss/',
  assets: 'src/assets/',
  fengelCRApp: 'fengel.com-crapp/',
  public: './public/'
}

export const clean = () => {
  return del([paths.public])
}

const clearRequireCache = () => {
  if(require.cache) {
    for (const moduleId of Object.keys(require.cache)) {
      if (moduleId.toString().indexOf('/src/') > 0) {
      delete require.cache[require.resolve(moduleId)]
      }
    }
  }
  
  return src(paths.components)
}

export const buildPhp = () => {
  return src(`${paths.components}pages/**/*.js`)
  .pipe(reactRender({type: 'markup'}))
  .pipe(flatten())
  .pipe(rename(function (path) {
    path.extname = ".php";
  }))
  .pipe(replace('&#x27;', "'"))
  .pipe(replace('&lt;?', '<?'))
  .pipe(replace('?&gt;', '?>'))
  .pipe(replace('&lt;!--', '<!--'))
  .pipe(replace('--&gt;', '-->'))
  .pipe(replace('&lt;![', '<!['))
  .pipe(replace(']&gt;', ']>'))
  .pipe(htmlbeautify({indentSize: 2}))
  .pipe(dest(paths.public))
}

export const buildSass = () => {
  return src(`${paths.scss}/styles.scss`, {allowEmpty: true})
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
  .pipe(dest(`${paths.public}/assets/css/`))
}

export const copyAssets = () => {
  return src(`${paths.assets}**/*`)
  .pipe(dest(paths.public))
}

export const copyCrapp = () => {
  return src(`${paths.fengelCRApp}build/static/**/*`)
  .pipe(dest(`${paths.public}assets`))
}

export const injectScripts = () => {
  const sources = src([`${paths.public}assets/**/*.js`, `${paths.public}assets/**/*.css`], {read: false});
    return src(paths.public + '*.php')
    .pipe(inject(sources, {ignorePath: 'public', addPrefix: '/wp-content/themes/wp-theme-fengelCRApp'}))
    .pipe(dest(paths.public))
}

export const serve = () => {
  const server = gls.static('public', 3000)
  watchSrc(['public/**/*.css', 'public/*.html'], (file) => {
    server.notify(file).on('error', onError)
  })
  .on('error', onError)
  server.start()
}

const watchStyles = () => {
  return watchSrc(`${paths.scss}**/*.scss`, buildSass)  
}
const watchComponentStyles = () => {
  return watchSrc(`${paths.components}**/*.scss`, buildSass)
}
const watchJs = () => {
  return watchSrc(`${paths.components}**/*.js`, series(clearRequireCache, buildInject))
}
const watchAssets = () => {
  return watchSrc(`${paths.assets}**/*.*`, {cwd: './'}, copyAssets)
}

const watchAll = parallel(watchStyles, watchComponentStyles, watchJs, watchAssets)
watchAll.description = 'watch for changes to all source'

const onError = (error) => {
  console.log("ERROR:", error.message)
  if (error.plugin) {
    console.log('Plugin: ' + error.plugin)
  }
  this.emit('end')
}

export const parallelTasks = parallel(buildPhp, buildSass, copyAssets, copyCrapp)
export const watchAndServe = parallel(watchAll)
export const buildInject = series(buildPhp, injectScripts)

export const build = series(clean, parallelTasks, injectScripts, watchAndServe)

export default build