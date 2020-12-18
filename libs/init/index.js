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
const { error } = require('../helper')

function fmtTypes(types) {
  const arr = [
    'other',
    'eslint',
    'webpack'
  ]

  if (!types || !Array.isArray(types) || types.length === 0) {
    arr.push('babel', 'sass')
  } else {
    arr.push(types.join(' '))
  }

  // check typescript

  // Array deduplication
  return Array.from(new Set(arr))
}

function init(name, types) {
  handlePackageJson(name)

  const arr = fmtTypes(types)

  const header = getHeader()

  // eslintrc
  fs.writeFileSync('./.eslintrc.js', header + getEslint(arr))

  // tsconfig.json
  if (arr.includes('ts') || arr.includes('typescript')) {
    fs.writeFileSync('./tsconfig.json', getTsConfig())
  }

  // webpack.config.js
  const { entry } = handleWebpackConfig(name, arr)
  // create index.js/ts file
  shell.mkdir('src')
  createFiles(entry, name, header)
  // fs.writeFileSync(entry, fileCode)

  shell.mkdir('static')

  // babelrc
  fs.writeFileSync('./.babelrc', getBabelRc(arr))

  // install dev dependencies
  shell.exec(`npm i -D ${getPackages(arr)}`)
}

module.exports = {
  init
}
