/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-15 17:03
 */
const PKG_TYPESCRIPT = [
  'typescript',
  'ts-node',
  'ts-loader',
  '@babel/plugin-transform-typescript',
  '@babel/preset-typescript',
  '@typescript-eslint/eslint-plugin',
  '@typescript-eslint/parser',
  '@types/node',
  '@types/react',
  '@types/react-dom',
  '@types/react-router-dom',
  '@types/jest',
  '@types/html-webpack-plugin',
  '@types/webpack',
  '@types/webpack-dev-server'
]

const PKG_REACT = [
  'react',
  'react-dom',
  'react-router-dom',
  'prop-types',
  '@babel/preset-react',
  'eslint-plugin-react'
]

const PKG_VUE = [
  'eslint-plugin-vue',
  'babel-eslint',
  'vue',
  'vue-loader',
  'vue-template-compiler'
]

const PKG_WEBPACK = [
  'webpack',
  'webpack-cli',
  'webpack-merge',
  'webpack-dev-server',
  'html-webpack-plugin',
  'clean-webpack-plugin',
  'copy-webpack-plugin',
  'eslint-webpack-plugin',
  'file-loader'
]

const PKG_ESLINT = [
  'eslint',
  'eslint-config-standard',
  // 'eslint-plugin-standard',
  'eslint-plugin-import eslint-plugin-node eslint-plugin-promise'
]

const PKG_BABEL = [
  '@babel/core',
  '@babel/preset-env',
  'babel-loader',
  'babel-eslint'
]

const PKG_SASS = [
  'sass',
  'sass-loader',
  'style-loader',
  'style-resources-loader',
  'css-loader'
]

const PKG_OTHER = [
  'date-utils-2020'
]

const PACKAGES = {
  ts: PKG_TYPESCRIPT,
  typescript: PKG_TYPESCRIPT,
  react: [
    ...PKG_BABEL,
    ...PKG_REACT
  ],
  vue: PKG_VUE,
  webpack: PKG_WEBPACK,
  babel: PKG_BABEL,
  sass: PKG_SASS,
  scss: PKG_SASS,
  other: PKG_OTHER,
  eslint: PKG_ESLINT
}

/**
 * get packages
 * @param arr
 * @returns {string}
 */
function getPackages(arr) {
  let pkg
  return arr.map(type => {
    pkg = PACKAGES[type.trim().toLowerCase()]
    return pkg ? pkg.join(' ') : ''
  }).join(' ')
}

module.exports = {
  getPackages
}
