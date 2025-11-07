import { vi } from 'vitest';

export const window = {
  createOutputChannel: vi.fn(() => ({
    appendLine: vi.fn(),
    append: vi.fn(),
    clear: vi.fn(),
    show: vi.fn(),
    hide: vi.fn(),
    dispose: vi.fn(),
  })),
  showInformationMessage: vi.fn(),
  showErrorMessage: vi.fn(),
  showWarningMessage: vi.fn(),
  activeTextEditor: undefined,
  visibleTextEditors: [],
};

export const workspace = {
  getConfiguration: vi.fn(() => ({
    get: vi.fn((key: string, defaultValue: any) => defaultValue),
    has: vi.fn(() => true),
    inspect: vi.fn(),
    update: vi.fn(),
  })),
  workspaceFolders: [
    {
      uri: {
        fsPath: '/test/workspace',
        path: '/test/workspace',
      },
      name: 'test',
      index: 0,
    },
  ],
  rootPath: '/test/workspace',
  onDidSaveTextDocument: vi.fn(() => ({ dispose: vi.fn() })),
  getWorkspaceFolder: vi.fn(() => ({
    uri: {
      fsPath: '/test/workspace',
      path: '/test/workspace',
    },
  })),
};

export const commands = {
  registerCommand: vi.fn(() => ({ dispose: vi.fn() })),
  executeCommand: vi.fn(),
};

export const StatusBarAlignment = {
  Left: 1,
  Right: 2,
};

export const Uri = {
  file: (path: string) => ({ fsPath: path, path }),
  parse: (uri: string) => ({ fsPath: uri, path: uri }),
};

export const Position = class {
  constructor(
    public line: number,
    public character: number
  ) {}
};

export const Range = class {
  constructor(
    public start: any,
    public end: any
  ) {}

  with(start?: any, end?: any) {
    return new Range(start || this.start, end || this.end);
  }
};

export class Disposable {
  constructor(private callOnDispose: () => void) {}
  dispose() {
    this.callOnDispose();
  }
}

export const env = {
  clipboard: {
    writeText: vi.fn(() => Promise.resolve()),
    readText: vi.fn(() => Promise.resolve('')),
  },
  openExternal: vi.fn(() => Promise.resolve(true)),
};

export const ViewColumn = {
  One: 1,
  Two: 2,
  Three: 3,
};
