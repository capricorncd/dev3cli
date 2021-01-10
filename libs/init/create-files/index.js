/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-18 17:10
 */
const fs = require('fs-extra')
const shell = require('shelljs')
const { getHeader } = require('../header')
const { SYS_EOL, BLANK_LINE } = require('../../constants')
const { createTsVue } = require('./ts-vue')
const { createTsReact } = require('./ts-react')
const { createVue } = require('./vue')
const { createReact } = require('./react')

function createFiles(entry, name, arr) {
  // create scss file
  const sassCode = [
    getHeader(),
    `h1 { color: red; }`,
  ]
  fs.writeFileSync('src/style.scss', sassCode.join(SYS_EOL))

  // create README.md
  const readmeCode = [
    `# ${name}`,
    BLANK_LINE,
    'This project was created by the <a href="https://github.com/capricorncd/dev3cli" target="_blank">dev3cli</a> command tool.',
    'https://github.com/capricorncd/dev3cli',
    BLANK_LINE,
    '## Build Setup',
    BLANK_LINE,
    '```bash',
    '# serve with hot reload at localhost:4000',
    '$ npm run dev',
    '# or',
    '$ yarn dev',
    BLANK_LINE,
    '# build static project',
    '$ npm run build',
    '# or',
    '$ yarn build',
    '```',
  ]
  fs.writeFileSync('README.md', readmeCode.join(SYS_EOL))

  // create js/vue/react files
  const importSass = `import './style.scss'`
  const jsCode = [
    getHeader(),
  ]

  // typescript
  if (arr.includes('ts')) {
    const typesCode = [
      getHeader(),
    ]
    // types
    shell.mkdir('types')

    if (arr.includes('vue')) {
      createTsVue(jsCode, importSass, typesCode)
    } else if (arr.includes('react')) {
      createTsReact(jsCode, importSass, typesCode)
    } else {
      jsCode.push(
        importSass,
        BLANK_LINE,
        `document.querySelector('#app')!.innerHTML = '<h1>${name}</h1>'`
      )
    }
    fs.writeFileSync(entry, jsCode.join(SYS_EOL))
    fs.writeFileSync('types/index.d.ts', typesCode.join(SYS_EOL))
    return
  }

  // javascript
  if (arr.includes('vue')) {
    createVue(jsCode, importSass, BLANK_LINE)
  } else if (arr.includes('react')) {
    createReact(jsCode, importSass, BLANK_LINE)
  } else {
    jsCode.push(
      importSass,
      BLANK_LINE,
      `document.querySelector('#app').innerHTML = '<h1>${name}</h1>'`
    )
  }

  fs.writeFileSync(entry, jsCode.join(SYS_EOL))
}

module.exports = {
  createFiles
}
