import { execSync } from 'child_process';
import type { ExtensionContext } from 'vscode';
import { StatusBarAlignment, commands, window, workspace } from 'vscode';

import { ctx } from '@common/context';
import fileheader, { fileheaderUpdate } from '@extentions/fileheader';
import { genReactPage, genVuePage, genWpPage, genDefs, genFields, genTailwindCSS } from '@extentions/generate';
import jenkins from '@extentions/jenkins';
import { log } from '@utils/log';

export function activate({ subscriptions }: ExtensionContext) {
    try {
        log.info('"franky" is now active!');
        ctx.active = true;
        const name = execSync('git config --get user.name').toString().trim();
        ctx.name = name;
        subscriptions.push(
            commands.registerCommand('franky.fileheader', fileheader),
            commands.registerCommand('franky.jenkins', jenkins),
            commands.registerCommand('franky.generate.vue', genVuePage),
            commands.registerCommand('franky.generate.react', genReactPage),
            commands.registerCommand('franky.generate.wp', genWpPage),
            commands.registerCommand('franky.generate.defs', genDefs),
            commands.registerCommand('franky.generate.fields', genFields),
            commands.registerCommand('franky.generate.css2tailwind', genTailwindCSS)
        );
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
    } catch (error) {
        log.debug(error)
    }

}

export function deactivate() { }
