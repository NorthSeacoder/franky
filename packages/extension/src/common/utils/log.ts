import { window } from 'vscode';

export const channel = window.createOutputChannel('Franky');

export const log = {
  debug(...args: unknown[]) {
    const time = new Date().toLocaleTimeString();
    this.log(`[Debug - ${time}] `, ...args);
  },

  log(...args: unknown[]) {
    const msg = args.map((i) => String(i)).join(' ');
    channel.appendLine(msg);
  },

  info(...args: unknown[]) {
    const time = new Date().toLocaleTimeString();
    this.log(`[Info - ${time}] `, ...args);
  },
};
