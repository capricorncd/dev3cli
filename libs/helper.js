/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-12 16:56
 */
const chalk = require('chalk')

function log(...args) {
  console.log.apply(null, args.map(str => chalk.green(str)))
}

function error(...args) {
  console.log.apply(null, args.map(str => chalk.red(str)))
}

function warn(...args) {
  console.log.apply(null, args.map(str => chalk.yellow(str)))
}

function info(...args) {
  console.log.apply(null, args.map(str => chalk.blue(str)))
}

function isArray(arr) {
  return Array.isArray(arr)
}

function isString(str) {
  return typeof str === 'string'
}

function isObject(o) {
  return o && typeof o === 'object'
}

function isFunction(fn) {
  return typeof fn === 'function'
}

module.exports = {
  log,
  error,
  warn,
  info,
  isObject,
  isString,
  isFunction,
  isArray
}
