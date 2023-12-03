import {workspace, commands, window, StatusBarAlignment} from 'vscode';
import type {ExtensionContext} from 'vscode';
import {execSync} from 'child_process';

import {log} from '@utils/log';
import {ctx} from '@common/context';
import fileheader, {fileheaderUpdate} from '@extentions/fileheader';
import jenkins from '@extentions/jenkins';
import {genVuePage,genReactPage} from '@extentions/generate';

export function activate({globalState}: ExtensionContext) {
    log.debug('"franky" is now active!');
    ctx.active = true;
    const name = execSync('git config --get user.name').toString().trim();
    ctx.name = name;
    commands.registerCommand('franky.fileheader', fileheader);
    commands.registerCommand('franky.jenkins', jenkins);
    commands.registerCommand('franky.generate.vue', genVuePage);
    commands.registerCommand('franky.generate.react', genReactPage);
    // commands.registerCommand('franky.generate.fields', genFields);
    // commands.registerCommand('franky.generate.options', genOptions);
    // commands.registerCommand('franky.generate.modal', genModal);
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
