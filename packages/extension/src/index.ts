import {execSync} from 'child_process';
import type {ExtensionContext} from 'vscode';
import {StatusBarAlignment, commands, window, workspace, ViewColumn, Uri} from 'vscode';

import {ctx} from '@common/context';

import FileExplorer from '@commands/template/file-explorer';
import {CommandManager} from '@commands/index';
import {log, channel} from '@utils/log';

export function activate(context: ExtensionContext) {
    try {
        log.info('"franky" is now active!');
        ctx.active = true;
        const name = execSync('git config --get user.name').toString().trim();
        ctx.name = name;
        const {subscriptions} = context;

        subscriptions.push(channel);

        const cm = new CommandManager(context);
        // new FileExplorer(context);
        const statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 0);
        statusBar.command = 'franky.jumpCicd';
        statusBar.text = 'cicd';
        statusBar.tooltip = 'Jump to cicd';
        statusBar.show();
        cm.registerDisposable(statusBar)
    } catch (error) {
        log.debug('activate', error);
    }
}

export function deactivate() {}
