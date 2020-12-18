/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-18 09:45
 */
const { sync: replaceSync } = require('replace-in-file')
const { obj2str } = require('obj2str')
const { error } = require('../helper')
const { getHeader } = require('./header')

const RULES = {
  ts: {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  },
  babel: {
    test: /\.jsx?$/,
    use: 'babel-loader',
    exclude: /node_modules/,
  }
}

function handleWebpackConfig(name, arr) {
  let rules
  let fileExt = 'js'
  Object.keys(RULES).forEach(key => {
    if (arr.includes(key)) {
      rules = RULES[key]
    }
  })

  if (arr.includes('ts') || arr.includes('typescript')) {
    fileExt = 'ts'
  }

  try {
    replaceSync({
      files: './webpack.config.js',
      from: [
        /\/\/__HEADER__/g,
        /\/\/__RULES__/,
        /__SRC_FILE_EXT__/
      ],
      to: [
        getHeader(),
        rules ? obj2str(rules, { initSpaces: 6 }) : '',
        fileExt
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
