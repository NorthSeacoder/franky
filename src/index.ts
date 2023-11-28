import {workspace, commands, window, StatusBarAlignment} from 'vscode';
import type {ExtensionContext} from 'vscode';

import {log} from '@utils/log';
import fileheader, {fileheaderUpdate} from '@extentions/fileheader';
import jenkins from '@extentions/jenkins';

export function activate({subscriptions}: ExtensionContext) {
    log.debug('"franky" is now active!');
    commands.registerCommand('franky.fileheader', fileheader);
    commands.registerCommand('franky.jenkins', jenkins)
    // subscriptions
    //     .push(commands.registerCommand('franky.fileheader', fileheader))
    //     .push(commands.registerCommand('franky.jenkins', jenkins));
    // window.showInformationMessage('Hello')

    workspace.onDidSaveTextDocument((file) => {
        setTimeout(() => {
            fileheaderUpdate(file);
        }, 200);
    });

    const statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 0);
    statusBar.command = 'franky.jenkins';
    statusBar.text = 'Jenkins';
    statusBar.tooltip = 'Jump to Jenkins';
    statusBar.show();
}

export function deactivate() {}
