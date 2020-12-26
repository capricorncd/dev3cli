/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-18 17:10
 */
const fs = require('fs-extra')
const { getHeader } = require('../header')
const { SYS_EOL } = require('../../constants')
const { createTsVue } = require('./ts-vue')
const { createTsReact } = require('./ts-react')
const { createVue } = require('./vue')
const { createReact } = require('./react')

function createFiles(entry, name, arr) {
  // create scss file
  const sassCode = [
    `h1 { color: red; }`
  ]
  fs.writeFileSync('src/style.scss', sassCode.join(SYS_EOL))

  // create js/vue/react files
  const importSass = `import './style.scss'`
  const blankLine = ''
  const jsCode = [
    getHeader()
  ]

  // typescript
  if (arr.includes('ts')) {
    if (arr.includes('vue')) {
      createTsVue(jsCode, importSass, blankLine)
    } else if (arr.includes('react')) {
      createTsReact(jsCode, importSass, blankLine)
    } else {
      jsCode.push(
        importSass,
        blankLine,
        `document.querySelector('#app')!.innerHTML = '<h1>${name}</h1>'`
      )
    }
    fs.writeFileSync(entry, jsCode.join(SYS_EOL))
    return
  }

  // javascript
  if (arr.includes('vue')) {
    createVue(jsCode, importSass, blankLine)
  } else if (arr.includes('react')) {
    createReact(jsCode, importSass, blankLine)
  } else {
    jsCode.push(
      importSass,
      blankLine,
      `document.querySelector('#app').innerHTML = '<h1>${name}</h1>'`
    )
  }

  fs.writeFileSync(entry, jsCode.join(SYS_EOL))
}

module.exports = {
  createFiles
}
