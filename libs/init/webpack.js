/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-18 09:45
 */
const { sync: replaceSync } = require('replace-in-file')
const { obj2str } = require('obj2str')
const { error } = require('../helper')
const { getHeader } = require('./header')
const { SYS_EOL } = require('../constants')

const RULES = {
  ts: {
    test: /\.tsx?$/,
    loader: 'ts-loader',
    exclude: /node_modules/
  },
  babel: {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/
  },
  vue: {
    test: /\.vue$/,
    loader: 'vue-loader'
  }
}

RULES.react = RULES.babel

const PLUGINS = {
  vue: {
    import: [
      'const VueLoaderPlugin = require(\'vue-loader/lib/plugin\')'
    ],
    global: [
      'new VueLoaderPlugin()'
    ]
  }
}

function handleWebpackConfig(name, arr) {
  let fileExt = 'js'
  const importArr = []
  const globalPlugins = []

  // rules
  const rules = []
  Object.keys(RULES).forEach(key => {
    if (arr.includes(key)) {
      let temp = RULES[key]
      if (key === 'ts') {
        if (arr.includes('vue')) {
          temp.options = { appendTsSuffixTo: [/\.vue$/] }
        }
      }
      rules.push(temp)
    }
  })

  let rulesStr = ''
  if (rules.length > 0) {
    rulesStr = rules.map(rule => {
      return obj2str(rule, {
        initSpaces: 6
      })
    }).join(',' + SYS_EOL)
  }

  // plugins
  Object.keys(PLUGINS).forEach(key => {
    if (arr.includes(key)) {
      let temp = PLUGINS[key]
      if (temp.import) {
        importArr.push(...temp.import)
      }
      if (temp.global) {
        globalPlugins.push(...temp.global)
      }
    }
  })

  if (arr.includes('ts')) {
    fileExt = arr.includes('react') ? 'tsx' : 'ts'
  } else if (arr.includes('react')) {
    fileExt = 'jsx'
  }

  try {
    replaceSync({
      files: './webpack.config.js',
      from: [
        /\/\/__HEADER__/g,
        /\/\/__IMPORT__/,
        /\/\/__RULES__/,
        /__SRC_FILE_EXT__/,
        /\/\/__GLOBAL_PLUGIN__/
      ],
      to: [
        getHeader(),
        importArr.join(SYS_EOL),
        rulesStr,
        fileExt,
        globalPlugins.join(`,${SYS_EOL}`)
      ]
    })

    replaceSync({
      files: './index.html',
      from: [
        /__TITLE__/g
      ],
      to: [
        name
      ]
    })
  } catch (e) {
    error(e)
  }
  return {
    entry: `./src/index.${fileExt}`
  }
}

module.exports = {
  handleWebpackConfig
}
