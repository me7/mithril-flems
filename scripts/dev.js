const wright = require('wright')
    , rollup = require('rollup')
    , commonjs = require('rollup-plugin-commonjs')
    , nodeResolve = require('rollup-plugin-node-resolve')
    , replace = require('rollup-plugin-replace')
    , string = require('rollup-plugin-string')
    , buble = require('rollup-plugin-buble')
    , codemirrorCss = require('./codemirrorcss')
    , pkg = require('../package.json')

wright({
  main: 'scripts/index.html',
  serve: 'dist',
  // run: 'm.redraw',
  debug: true,
  js: {
    watch: 'src/**/*.js',
    path: 'app.js',
    compile: roll
  }
})

let cache = null
function roll(dev) {
  return rollup.rollup({
    input: 'src/index.js',
    cache: cache,
    plugins: [
      replace({
        'process.env.FLEMS_VERSION': JSON.stringify(pkg.version),
        codemirrorStyles: JSON.stringify(codemirrorCss)
      }),
      string({ include: 'src/**/*.svg' }),
      commonjs(),
      nodeResolve(),
      buble()
    ]
  })
  .then(bundle => {
    cache = bundle
    return bundle.generate({
      name: 'app',
      format: 'umd'
    })
  })
  .then(result => result.code)
}
