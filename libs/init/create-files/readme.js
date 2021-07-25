/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-07-25 15:06 (GMT+0900)
 */
const fs = require('fs-extra')
const { SYS_EOL, BLANK_LINE } = require('../../constants')

function createReadmeFile(name) {
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
}

module.exports = {
  createReadmeFile,
}
