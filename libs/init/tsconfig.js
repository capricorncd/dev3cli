/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-18 12:50
 */
const { obj2str } = require('obj2str')

const tsConfig = {
  'compilerOptions': {
    'target': 'ES2018',
    'module': 'ESNext',
    'moduleResolution': 'Node',
    'lib': [
      'ESNext',
      'ESNext.AsyncIterable',
      'DOM'
    ],
    'esModuleInterop': true,
    'allowJs': true,
    'sourceMap': true,
    'strict': true,
    'noEmit': true,
    'experimentalDecorators': true,
    'baseUrl': '.',
    'paths': {
      '~/*': [
        './*'
      ],
      '@/*': [
        './*'
      ]
    },
    'types': [
      '@types/node'
    ]
  },
  'exclude': [
    'node_modules',
    'dist'
  ]
}

function getTsConfig() {
  return obj2str(tsConfig, {
    keyQuote: true,
    doubleQuotes: true
  })
}

module.exports = {
  getTsConfig
}
