import * as os from 'os';
import * as vscode from 'vscode';
import { copyToClipboard, getExtensionVersion, showErrorMessage } from '@utils/index';
import { Disposable } from '@utils/disposable';
import { log } from '@utils/log';
import {
  genReactPage,
  genVuePage,
  genWpPage,
  genDefs,
  genFields,
  genTailwindCSS,
} from './generate';
import insertFileHeader, { fileheaderUpdate } from './fileheader';
import ViewPanel from './template/view-panel';
import FileExplorer from './template/file-explorer';
import Config from '@utils/config';

export class CommandManager extends Disposable {
  private readonly context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    super();
    this.context = context;

    this.registerCommand('franky.version', async () => this.version());
    this.registerCommand('franky.generate.vue', (uri?: vscode.Uri) => genVuePage(uri));
    this.registerCommand('franky.generate.react', (uri?: vscode.Uri) => genReactPage(uri));
    this.registerCommand('franky.generate.wp', (uri?: vscode.Uri) => genWpPage(uri));
    this.registerCommand('franky.generate.defs', () => genDefs());
    this.registerCommand('franky.generate.fields', () => genFields());
    this.registerCommand('franky.generate.css2tailwind', (uri: vscode.Uri) => genTailwindCSS(uri));
    this.registerCommand('franky.jumpCicd', () => {
      const url = Config.cicdUrl;
      if (!url) {
        showErrorMessage('CI/CD URL is not configured.');
        return;
      }
      void vscode.env.openExternal(vscode.Uri.parse(url));
    });
    this.registerCommand('franky.fileheader', () => insertFileHeader());

    this.registerDisposable(
      vscode.workspace.onDidSaveTextDocument((file) => {
        void fileheaderUpdate(file);
      })
    );

    this.registerCommand('franky.template', (uri: vscode.Uri) => {
      ViewPanel.render(
        context.extensionUri,
        context.globalState,
        uri?.fsPath ?? vscode.workspace.workspaceFolders?.[0]?.uri.fsPath
      );
    });

    new FileExplorer(this);
  }

  public registerCommand(command: string, callback: (...args: any[]) => any) {
    this.registerDisposable(
      vscode.commands.registerCommand(command, async (...args: any[]) => {
        log.info('Command Invoked:', command);
        try {
          const result = await callback(...args);
          return result;
        } catch (error) {
          log.debug(`Command ${command} failed`, error);
          showErrorMessage(`Command ${command} failed: ${error}`);
        }
      })
    );
  }

  private async version() {
    try {
      const frankyhVersion = await getExtensionVersion(this.context);
      const information =
        'Franky: ' +
        frankyhVersion +
        '\nVisual Studio Code: ' +
        vscode.version +
        '\nOS: ' +
        os.type() +
        ' ' +
        os.arch() +
        ' ' +
        os.release();

      const selectedItem = await vscode.window.showInformationMessage(
        information,
        { modal: true },
        'Copy'
      );
      if (selectedItem === 'Copy') {
        const result = await copyToClipboard(information);
        if (result !== null) {
          showErrorMessage(result);
        }
      }
    } catch (error) {
      log.debug('Version command error', error);
      showErrorMessage('An unexpected error occurred while retrieving version information.');
    }
  }
}
