/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-18 11:50
 */
const { obj2str } = require('obj2str')

const typescript = {
  "presets": [
    "@babel/preset-typescript"
  ],
  "plugins": [
    "@babel/plugin-transform-typescript"
  ]
}

const BABEL_RC = {
  ts: typescript,
  typescript,
  babel: {
    "presets": [
      "@babel/preset-env"
    ],
    "plugins": []
  }
}

function getBabelRc(arr) {
  let rc = {}
  Object.keys(BABEL_RC).forEach(key => {
    if (arr.includes(key)) {
      rc = BABEL_RC[key]
    }
  })
  return obj2str(rc, {
    doubleQuotes: true,
    keyQuote: true
  })
}

module.exports = {
  getBabelRc
}
