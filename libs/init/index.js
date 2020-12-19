/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-12 16:33
 */
const fs = require('fs-extra')
const shell = require('shelljs')
const { getPackages } = require('./packages')
const { getEslint } = require('./eslint')
const { getTsConfig } = require('./tsconfig')
const { getBabelRc } = require('./babel')
const { handleWebpackConfig } = require('./webpack')
const { handlePackageJson } = require('./package-json')
const { getHeader } = require('./header')
const { createFiles } = require('./create-files')
const { log, info } = require('../helper')

function fmtTypes(types) {
  const arr = [
    'other',
    'eslint',
    'webpack',
    'sass'
  ]

  if (!types || !Array.isArray(types) || types.length === 0) {
    arr.push('babel')
  } else {
    arr.push(types.join(' '))
  }

  // Array deduplication
  return Array.from(new Set(arr))
}

function init(name, types) {
  handlePackageJson(name)

  const arr = fmtTypes(types)

  const header = getHeader()

  log('...eslintrc')
  // eslintrc
  fs.writeFileSync('./.eslintrc.js', header + getEslint(arr))

  // tsconfig.json
  if (arr.includes('ts') || arr.includes('typescript')) {
    log('...tsconfig')
    fs.writeFileSync('./tsconfig.json', getTsConfig())
  }

  log('...webpack.config')
  // webpack.config.js
  const { entry } = handleWebpackConfig(name, arr)
  // create index.js/ts file
  shell.mkdir('src')
  log('...init files')
  createFiles(entry, name, arr)
  // fs.writeFileSync(entry, fileCode)

  shell.mkdir('static')

  log('...babelrc')
  // babelrc
  fs.writeFileSync('./.babelrc', getBabelRc(arr))

  info('...npm install')
  log('...await')
  // install dev dependencies
  shell.exec(`npm i -D ${getPackages(arr)}`)
}

module.exports = {
  init
}
