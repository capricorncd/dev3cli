/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-18 17:10
 */
const fs = require('fs-extra')
const { getHeader } = require('./header')
const { SYS_EOL } = require('../constants')

function createFiles(entry, name, arr) {
  const importSass = `import './style.scss'`
  const blackLint = ''
  const jsCode = [
    getHeader()
  ]

  if (arr.includes('vue')) {
    jsCode.push(
      'import Vue from \'vue\'',
      'import App from \'./App\'',
      importSass,
      blackLint,
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
      blackLint,
      '<script>',
      'export default {',
      '}',
      '</script>',
      blackLint,
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
      blackLint,
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
      blackLint,
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
      blackLint,
      'export default App'
    ]
    fs.writeFileSync('src/App.jsx', appReact.join(SYS_EOL))
  } else {
    jsCode.push(
      importSass,
      blackLint,
      `document.querySelector('#app').innerHTML = '<h1>${name}</h1>'`
    )
  }

  const sassCode = [
    `h1 { color: red; }`
  ]

  fs.writeFileSync(entry, jsCode.join(SYS_EOL))
  fs.writeFileSync('src/style.scss', sassCode.join(SYS_EOL))
}

module.exports = {
  createFiles
}
