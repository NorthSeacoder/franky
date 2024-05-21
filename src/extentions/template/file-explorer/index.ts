import {window, commands} from 'vscode';
import type {ExtensionContext, Uri} from 'vscode';

import {FileSystemProvider} from './file-system-provider';

import {updateTemplatesRepo} from './utils'
export default class FileExplorer {
    constructor(context: ExtensionContext) {
        const treeDataProvider = new FileSystemProvider();
        context.subscriptions.push(window.createTreeView('fileExplorer', {treeDataProvider}));
        commands.registerCommand('fileExplorer.openFile', (resource) => this.openResource(resource));
        updateTemplatesRepo()
    }

    private openResource(resource: Uri): void {
        window.showTextDocument(resource);
    }
}
