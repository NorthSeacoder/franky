import type { WebviewApi } from "vscode-webview";

/**
 * A utility wrapper around the acquireVsCodeApi() function, which enables
 * message passing and state management between the webview and extension
 * contexts.
 *
 * This utility also enables webview code to be run in a web browser-based
 * dev server by using native web browser features that mock the functionality
 * enabled by acquireVsCodeApi.
 */
class VSCodeAPIWrapper {
  private readonly vsCodeApi: WebviewApi<unknown> | undefined;

  constructor() {
    // Check if the acquireVsCodeApi function exists in the current development
    // context (i.e. VS Code development window or web browser)
    if (typeof acquireVsCodeApi === "function") {
      this.vsCodeApi = acquireVsCodeApi();
    }
  }

  public postMessage(message: unknown) {
    if (this.vsCodeApi) {
      this.vsCodeApi.postMessage(message);
    } else {
      console.log(message);
    }
  }
  
  async invoke(options: { command: string; default?: any; args?: any[] }): Promise<any> {
    return await new Promise<string>((resolve) => {
      if (typeof acquireVsCodeApi !== 'function') {
        resolve(options.default)
        return
      }
      const id = Date.now() + '_' + Math.random()
      const listener = (message: MessageEvent) => {
        const data = message.data
        if (data.command === id) {
          resolve(data.data[0])
          window.removeEventListener('message', listener)
        }
      }
      window.addEventListener('message', listener)
      vscode.postMessage({
        command: options.command,
        data: options.args,
        callback: id,
      })
    })
  }

  async getState(key: string):Promise<unknown | undefined> {
    if (this.vsCodeApi) {
      return await this.invoke({ command: 'getState', args: [key] })
    } else {
      const state = localStorage.getItem(key)
      return state ? JSON.parse(state) : undefined
    }
  }

  async setState<T extends unknown | undefined>(key: string, newState: T): Promise<void> {
    if (this.vsCodeApi) {
      return await this.invoke({ command: 'setState', args: [key, newState] })
    } else {
      localStorage.setItem(key, JSON.stringify(newState))
    }
  }
}

// Exports class singleton to prevent multiple invocations of acquireVsCodeApi.
export const vscode = new VSCodeAPIWrapper();
