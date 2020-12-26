/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-26 17:06
 */
const fs = require('fs-extra')
const { SYS_EOL } = require('../../constants')

function createVue(jsCode, importSass, blankLine) {
  jsCode.push(
    'import Vue from \'vue\'',
    'import App from \'./App\'',
    importSass,
    blankLine,
    '/* eslint-disable no-new */',
    'new Vue({',
    '  el: \'#app\',',
    '  render: h => h(App)',
    '})'
  )

  // create App.vue
  const appVueCode = [
    '<template>',
    '  <div>',
    `    <h1>Vue</h1>`,
    '    <p>This is a project developed using the Vue framework。</p>',
    '  </div>',
    '</template>',
    blankLine,
    '<script>',
    'export default {',
    '}',
    '</script>',
    blankLine,
    '<style lang="scss">',
    'h1 {',
    '  font-size: 50px;',
    '}',
    'p {',
    '  font-size: 24px;',
    '}',
    '</style>'
  ]
  fs.writeFileSync('src/App.vue', appVueCode.join(SYS_EOL))
}

module.exports = {
  createVue
}
