import * as chalk from 'chalk'

const getCurrentTimestamp = (): string => {
  const now = new Date()
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const day = now.getDate().toString().padStart(2, '0')
  const year = now.getFullYear().toString()
  const hours = now.getHours()
  const minutes = now.getMinutes().toString().padStart(2, '0')
  const seconds = now.getSeconds().toString().padStart(2, '0')
  const period = hours >= 12 ? 'PM' : 'AM'

  const timestamp = `${month}/${day}/${year}, ${hours}:${minutes}:${seconds} ${period}`
  return timestamp
}

export const bigoLog = (message: string): void => {
  console.log(`${chalk.bgGreen('[BIGO_LOG]') as string} - ${getCurrentTimestamp()} \t ${chalk.green(message) as string}`)
}

export const bigoLogError = (message: string): void => {
  console.log(`${chalk.bgRed('[BIGO_LOG]') as string} - ${getCurrentTimestamp()} \t ${chalk.red(message) as string}`)
}
