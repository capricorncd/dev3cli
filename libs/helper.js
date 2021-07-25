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

function getIPAddress() {
  const interfaces = require('os').networkInterfaces()
  let temp
  for (let devName in interfaces) {
    temp = interfaces[devName]
    for (let i = 0; i < temp.length; i++) {
      let alias = temp[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}

module.exports = {
  log,
  error,
  getIPAddress,
  warn,
  info,
  isObject,
  isString,
  isFunction,
  isArray
}
