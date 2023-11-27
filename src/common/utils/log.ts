import { window } from 'vscode'

export const channel = window.createOutputChannel('Franky')

export const log = {
  debug(...args: any[]) {
    // eslint-disable-next-line no-console
    console.log(...args)
    this.log(...args)
  },

  log(...args: any[]) {
    channel.appendLine(args.map(i => String(i)).join(' '))
  },
}
