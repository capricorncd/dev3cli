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
    use: 'ts-loader',
    exclude: /node_modules/
  },
  babel: {
    test: /\.jsx?$/,
    use: 'babel-loader',
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
  let rules
  let fileExt = 'js'
  const importArr = []
  const globalPlugins = []

  // rules
  Object.keys(RULES).forEach(key => {
    if (arr.includes(key)) {
      rules = RULES[key]
    }
  })

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

  if (arr.includes('ts') || arr.includes('typescript')) {
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
        rules ? obj2str(rules, { initSpaces: 6 }) : '',
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
