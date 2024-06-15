import {window, commands,Uri} from 'vscode';

import {FileSystemProvider} from './file-system-provider';
import {getLoaclPath} from '../utils'
import {updateTemplatesRepo} from './utils'
import type { CommandManager } from '@commands/index';
export default class FileExplorer {
    constructor(cm: CommandManager) {
        const treeDataProvider = new FileSystemProvider();
        cm.registerDisposable(window.createTreeView('fileExplorer', {treeDataProvider}));
        cm.registerCommand('fileExplorer.openFile', (resource) => this.openResource(resource));
        cm.registerCommand('franky.template.pull', () => {
            updateTemplatesRepo()
        });
        cm.registerCommand('franky.template.open', () => {
            const localPath = getLoaclPath();
            commands.executeCommand('vscode.openFolder', Uri.file(localPath), true);
        });
    }

    private openResource(resource: Uri): void {
        window.showTextDocument(resource);
    }
}
