import {window, commands, Uri, workspace, RelativePattern} from 'vscode';

import {FileSystemProvider} from './file-system-provider';
import {getLoaclPath} from '../utils';
import {updateTemplatesRepo} from './utils';
import type {CommandManager} from '@commands/index';
import {log} from '@utils/log';
export default class FileExplorer {
    constructor(cm: CommandManager) {
        const treeDataProvider = new FileSystemProvider();
        cm.registerDisposable(window.createTreeView('fileExplorer', {treeDataProvider}));
        cm.registerCommand('fileExplorer.openFile', (resource) => this.openResource(resource));
        cm.registerCommand('franky.template.pull', async () => {
            await updateTemplatesRepo();
            treeDataProvider.refresh();
        });
        cm.registerCommand('franky.template.open', () => {
            const localPath = getLoaclPath();
            commands.executeCommand('vscode.openFolder', Uri.file(localPath), true);
        });

        //检测本地模板仓库变化
        const localPath = getLoaclPath();
        const watcher = workspace.createFileSystemWatcher(localPath + '/**');
        cm.registerDisposables(
            watcher,
            watcher.onDidCreate((uri: Uri) => {
                log.info(`File created: ${uri.fsPath}`);
                // 在这里添加你的处理逻辑
            }),

            // 当文件被修改时触发
            watcher.onDidChange((uri: Uri) => {
                log.info(`File changed: ${uri.fsPath}`);
                // 在这里添加你的处理逻辑
            }),

            // 当文件被删除时触发
            watcher.onDidDelete((uri: Uri) => {
                log.info(`File deleted: ${uri.fsPath}`);
                // 在这里添加你的处理逻辑
            })
        );
    }

    private openResource(resource: Uri): void {
        window.showTextDocument(resource);
    }
}
