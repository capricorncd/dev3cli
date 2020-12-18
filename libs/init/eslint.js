/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-18 11:52
 */
const { obj2str } = require('obj2str')
const { isArray, isObject } = require('../helper')

const eslintrcObj = {
  env: {
    browser: true,
    node: true
  },
  globals: {
  },
  parserOptions: {
    // parser: 'babel-eslint',
    // https://eslint.org/docs/rules/rest-spread-spacing
    // error  Parsing error: Unexpected token ..
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  extends: [
    'standard',
    // 'eslint:recommended',
    // 'plugin:@typescript-eslint/recommended'
  ],
  // parser: '@typescript-eslint/parser',
  plugins: [
    // '@typescript-eslint'
  ],
  rules: {
    'space-before-function-paren': 0,
    // 'brace-style': [2, 'stroustrup', { allowSingleLine: true }],
    'brace-style': 0,
    // '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/no-explicit-any': 'off',
    // '@typescript-eslint/no-use-before-define': 'off',
  }
}

const typescript = {
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
  }
}

const ESLINTRC = {
  babel: {
    parserOptions: {
      parser: 'babel-eslint'
    }
  },
  ts: typescript,
  typescript
}

function getEslint(types) {
  // deep copy
  const eslint = JSON.parse(JSON.stringify(eslintrcObj))

  let temp, tempValue, oldValue
  types.forEach(type => {
    temp = ESLINTRC[type]
    if (!temp) return
    Object.keys(temp).forEach(key => {
      tempValue = temp[key]
      oldValue = eslint[key]
      if (isArray(oldValue)) {
        eslint[key] = oldValue.concat(tempValue)
      } else if (isObject(oldValue)) {
        Object.keys(tempValue).forEach(k => {
          eslint[key][k] = tempValue[k]
        })
      } else {
        eslint[key] = tempValue
      }
    })
  })

  return obj2str(eslint, {
    prefix: 'module.exports = '
  })
}

module.exports = {
  getEslint
}
