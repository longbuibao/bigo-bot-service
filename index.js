const shell = require('shelljs')

const installNodeJS = (version) => {
  shell.exec('curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh', (code) => {
    console.log(code)
  })
}

const checkIfInstalledNodeJs = () => {
  if (!shell.which('node')) {
    console.log('NodeJS is not installed. Installing NodeJS...')
  }
}

const checkNodeVersion = (version) => {
  shell.exec('node -v', (a, b, c) => { console.log({ a, b, c }) })
}
