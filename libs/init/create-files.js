/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-18 17:10
 */
const fs = require('fs-extra')

function createFiles(entry, name, header) {
  const jsCode = [
    header,
    `import './style.scss'`,
    '',
    `document.write('<h1>${name}</h1>')`
  ].join('\n')

  const sassCode = [
    `h1 { font-size: 32px; color: red; }`
  ].join('\n')

  fs.writeFileSync(entry, jsCode)
  fs.writeFileSync('src/style.scss', sassCode)
}

module.exports = {
  createFiles
}
