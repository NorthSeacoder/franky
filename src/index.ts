import {workspace, commands, window, StatusBarAlignment} from 'vscode';
import type {ExtensionContext} from 'vscode';

import {log} from '@utils/log';
import fileheader, {fileheaderUpdate} from '@extentions/fileheader';

export function activate(context: ExtensionContext) {
    log.debug('"franky" is now active!');

    context.subscriptions.push(commands.registerCommand('franky.fileheader', fileheader));
    // window.showInformationMessage('Hello')

    workspace.onDidSaveTextDocument((file) => {
        setTimeout(() => {
            fileheaderUpdate(file);
        }, 200);
    });

    const statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 0);
    statusBar.command = 'openInGitHub.openProject';
    statusBar.text = '$(github)';
    statusBar.tooltip = 'Open in GitHub';
    statusBar.show();
}

export function deactivate() {}
