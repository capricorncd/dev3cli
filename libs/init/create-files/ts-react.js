/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-26 17:14
 */
const fs = require('fs-extra')
const { SYS_EOL, BLANK_LINE } = require('../../constants')

function createTsReact(jsCode, importSass, typesCode) {
  jsCode.push(
    'import React from \'react\'',
    'import ReactDom from \'react-dom\'',
    'import App from \'./App\'',
    importSass,
    BLANK_LINE,
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
    BLANK_LINE,
    'function App (): React.ReactElement {',
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
    BLANK_LINE,
    'export default App'
  ]
  fs.writeFileSync('src/App.tsx', appReact.join(SYS_EOL))
}

module.exports = {
  createTsReact
}
