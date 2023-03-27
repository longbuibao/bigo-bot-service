const shell = require('shelljs')

const installNodeJS = (version) => {
  if (!shell.which('nvm')) {
    console.log('nvm is not installed. Installing nvm...')
    shell.exec('curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh', (code) => {
      console.log('Installing nvm...')
      console.log(code)
      console.log(`Installing ${version}`)
      console.log(`Selecting Node version ${version}`)
      console.log('Done!')
      console.log('--------------------------------------------------------------------')
    })
  } else {
    shell.exec('nvm list', (_, allNodeVersion) => {
      console.log(allNodeVersion)
    })
  }
}

const checkIfNodeVersionInstalled = (version) => {
  if (!shell.which('node')) {
    console.log('NodeJS is not installed. Installing NodeJS...')
    installNodeJS(version)
  } else {
    shell.exec('node -v', (_, systemInstalledNodeVersion) => {
      if (!systemInstalledNodeVersion.includes(version)) {
        console.log(`NodeJS version ${version} is not installed. Installing ${version} ...`)
        installNodeJS(version)
      } else console.log(`Node ${version.replace('\r\n', '')} installed`)
    })
  }
}

checkIfNodeVersionInstalled('16.15.1')
