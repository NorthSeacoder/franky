import { Color, window } from 'vscode'

export const channel = window.createOutputChannel('Franky')

export const log = {
  debug(...args: any[]) {
    // eslint-disable-next-line no-console
    const time = new Date().toLocaleTimeString()
    this.log(`[Debug - ${time}] `,...args)
  },

  log(...args: any[]) {
    const msg = args.map(i => String(i)).join(' ');
    channel.appendLine(msg)
  },

  info(...args: any[]){
    const time = new Date().toLocaleTimeString()
    this.log(`[Info - ${time}] `,...args)
  }
}
