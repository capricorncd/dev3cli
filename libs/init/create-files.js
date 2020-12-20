/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-18 17:10
 */
const fs = require('fs-extra')
const shell = require('shelljs')
const { getHeader } = require('./header')
const { SYS_EOL } = require('../constants')

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

    fs.writeFileSync(entry, jsCode.join(SYS_EOL))
    return
  }

  // javascript
  if (arr.includes('vue')) {
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
      `    <h1>${name}</h1>`,
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
  } else if (arr.includes('react')) {
    jsCode.push(
      'import React from \'react\'',
      'import ReactDom from \'react-dom\'',
      'import App from \'./App\'',
      importSass,
      blankLine,
      'ReactDom.render(<App/>, document.querySelector(\'#app\'))'
    )

    // create App.jsx
    const appReact = [
      'import React from \'react\'',
      'import {',
      '  HashRouter as Router,',
      '  Switch,',
      '  Route,',
      '  Link',
      '} from \'react-router-dom\'',
      blankLine,
      'function App () {',
      '  return (',
      '    <Router>',
      '      <div>',
      '        <ul>',
      '          <li><Link to=\'/\'>home</Link></li>',
      '          <li><Link to=\'/page\'>page</Link></li>',
      '        </ul>',
      '        <Switch>',
      '          <Route path="/page"><h1>Page</h1></Route>',
      '          <Route path="/"><h1>Home</h1></Route>',
      '        </Switch>',
      '      </div>',
      '    </Router>',
      '  )',
      '}',
      blankLine,
      'export default App'
    ]
    fs.writeFileSync('src/App.jsx', appReact.join(SYS_EOL))
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
