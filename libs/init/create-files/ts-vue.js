/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-26 17:01
 */
const fs = require('fs-extra')
const { SYS_EOL, BLANK_LINE } = require('../../constants')

function createTsVue(jsCode, importSass, typesCode) {
  jsCode.push(
    'import Vue from \'vue\'',
    'import App from \'./App.vue\'',
    importSass,
    BLANK_LINE,
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
    BLANK_LINE,
    '<script lang="ts">',
    'import Vue from \'vue\'',
    BLANK_LINE,
    'export default Vue.extend({',
    '  data () {',
    '    return {',
    '      title: \'Page Title\'',
    '    }',
    '  }',
    '})',
    '</script>',
    BLANK_LINE,
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
  typesCode.push(
    'declare module \'*.vue\' {',
    '  import Vue from \'vue\';',
    '  export default Vue;',
    '}'
  )
}

module.exports = {
  createTsVue
}
