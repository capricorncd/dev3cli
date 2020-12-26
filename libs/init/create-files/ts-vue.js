/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-26 17:01
 */
const fs = require('fs-extra')
const shell = require('shelljs')
const { SYS_EOL } = require('../../constants')

function createTsVue(jsCode, importSass, blankLine) {
  jsCode.push(
    'import Vue from \'vue\'',
    'import App from \'./App.vue\'',
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
    '    <h1>{{title}}</h1>',
    '    <p>This is a project developed using the Vue framework and Typescript。</p>',
    '  </div>',
    '</template>',
    blankLine,
    '<script lang="ts">',
    'import Vue from \'vue\'',
    blankLine,
    'export default Vue.extend({',
    '  data () {',
    '    return {',
    '      title: \'Page Title\'',
    '    }',
    '  }',
    '})',
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

  // create types files
  const typesFile = [
    'declare module \'*.vue\' {',
    '  import Vue from \'vue\';',
    '  export default Vue;',
    '}'
  ]
  shell.mkdir('types')
  fs.writeFileSync('types/index.d.ts', typesFile.join(SYS_EOL))
}

module.exports = {
  createTsVue
}
