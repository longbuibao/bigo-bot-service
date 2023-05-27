import * as chalk from 'chalk'

export const bigoLog = (message: string): void => {
  console.log(`${chalk.bgGreen('[BIGO_LOG]') as string} ${chalk.green(message) as string}`)
}

export const bigoLogError = (message: string): void => {
  console.log(`${chalk.bgRed('[BIGO_LOG]') as string} ${chalk.red(message) as string}`)
}
