/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-26 17:06
 */
const fs = require('fs-extra')
const { SYS_EOL } = require('../../constants')

function createReact(jsCode, importSass, blankLine) {
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
    '  Routes,',
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
    '        <Routes>',
    '          <Route path="/page" element={<h1>Page</h1>}></Route>',
    '          <Route path="/" element={<h1>Home</h1>}></Route>',
    '        </Routes>',
    '      </div>',
    '    </Router>',
    '  )',
    '}',
    blankLine,
    'export default App'
  ]
  fs.writeFileSync('src/App.jsx', appReact.join(SYS_EOL))
}

module.exports = {
  createReact
}
