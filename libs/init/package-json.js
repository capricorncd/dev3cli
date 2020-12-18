/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-18 12:32
 */
const fs = require('fs-extra')
const { obj2str } = require('obj2str')
const { error } = require('../helper')

// handle package.json
function handlePackageJson(name) {
  const path = './package.json'
  try {
    const pkg = {
      name,
      version: '0.0.1',
      description: name,
      license: 'MIT',
      author: 'Capricorncd',
      scripts: {
        dev: 'webpack serve',
        build: 'webpack --mode production'
      },
      keywords: [name],
      main: './dist/index.js'
    }

    fs.writeFileSync(path, obj2str(pkg, {
      doubleQuotes: true,
      keyQuote: true
    }))
  } catch (e) {
    error(e)
  }
}

module.exports = {
  handlePackageJson
}
