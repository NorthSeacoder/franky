import "reflect-metadata";
import '@extentions/template/controller/contoller-registry';
import {execSync} from 'child_process';
import type {ExtensionContext} from 'vscode';
import {StatusBarAlignment, commands, window, workspace,ViewColumn} from 'vscode';

import {ctx} from '@common/context';
import fileheader, {fileheaderUpdate} from '@extentions/fileheader';
import {genReactPage, genVuePage, genWpPage, genDefs, genFields, genTailwindCSS} from '@extentions/generate';
import jenkins from '@extentions/jenkins';
// import template from '@extentions/template';
import FileExplorer from '@extentions/template/file-explorer';
import ViewProviderPanel from '@extentions/template/view-provider/view-provider-panel';
import {log} from '@utils/log';


import {getControllers} from 'cec-client-server/decorator';

export function activate(context: ExtensionContext) {
    try {
        log.info('"franky" is now active!');
        const { callables, subscribables } = getControllers()
        log.info("callables", callables,subscribables);
        ctx.active = true;
        const name = execSync('git config --get user.name').toString().trim();
        ctx.name = name;
        const {subscriptions} = context;

        // 为指令 panel-view-container.show 注册行为
        const panelViewDisposable = commands.registerCommand('franky.view.show', () => {
            const viewProviderPanel = new ViewProviderPanel(context, {callables, subscribables});
            const panel = window.createWebviewPanel('panel-view-container', 'Panel View', ViewColumn.One, {});
            viewProviderPanel.resolveWebviewView(panel);
        });

        subscriptions.push(
            commands.registerCommand('franky.fileheader', fileheader),
            commands.registerCommand('franky.jenkins', jenkins),
            commands.registerCommand('franky.generate.vue', genVuePage),
            commands.registerCommand('franky.generate.react', genReactPage),
            commands.registerCommand('franky.generate.wp', genWpPage),
            commands.registerCommand('franky.generate.defs', genDefs),
            commands.registerCommand('franky.generate.fields', genFields),
            commands.registerCommand('franky.generate.css2tailwind', genTailwindCSS),

            // commands.registerCommand('franky.template', template),
            panelViewDisposable
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

        new FileExplorer(context);
    } catch (error) {
        log.debug('activate',error);
    }
}

export function deactivate() {}
