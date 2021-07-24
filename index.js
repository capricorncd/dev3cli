#!/usr/bin/env node
/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-11 21:33
 */
const { resolve } = require('path')
const program = require('commander')
const shell = require('shelljs')
const open = require('open')
const { spawn } = require('child_process')
const { init } = require('./libs/init/index')
const pkg = require('./package.json')
const fs = require('fs-extra')
const { log, error } = require('./libs/helper')

program.version(pkg.version)

// init
program.command('init <name>')
  .description('Create a project')
  .action(async name => {
    // current project directory
    const dirPath = `./${name}`

    // Check that the file exists
    if (fs.existsSync(dirPath)) {
      const errMsg = `The "${name}" directory already exists!`
      error(errMsg)
      throw new Error(errMsg)
    }

    // process arguments
    const args = process.argv.slice(4)

    // vite check
    if (args.includes('vite')) {
      if (args.includes('react')) {
        shell.cp('-R', resolve(__dirname, './vite-react'), dirPath)
        shell.cp('-R', resolve(__dirname, './template/.gitignore'), dirPath)
        shell.cd(dirPath)
        shell.exec(`npm i`)
        echoEndedInfo()
        return
      }
    }

    // copy template(webpack.config.js. etc) files.
    shell.cp('-R', resolve(__dirname, './template'), dirPath)
    shell.cd(dirPath)
    // shell.exec('npm init -y')

    init(name, args)

    echoEndedInfo()
  })

// run
program.command('run')
  .description('Run the project')
  .action(() => {
    // Use by shelljs
    // shell.exec('npm run dev')
    // Use by spawn
    let cp = spawn('npm', ['run', 'dev'])
    // spawn启动子进程的输出流和错误流，输出到主进程
    cp.stdout.pipe(process.stdout)
    cp.stderr.pipe(process.stderr)
    cp.on('close', () => {
      console.log(`Run the project successfully!`)
    })
  })

// start
program.command('start')
  .description('Start the project')
  .action(() => {
    open(`http://localhost:4000`)
    console.log(`Start the project successfully!`)
  })

program.parse(process.argv)

function echoEndedInfo() {
  log(`
      cd ${name}
      npm run dev
      The project will run at http://0.0.0.0:4000 or http://localhost/:4000
    `)
}
