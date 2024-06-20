import * as os from 'os';
import * as vscode from 'vscode';
import {copyToClipboard, getExtensionVersion, showErrorMessage} from '@utils/index';
import {Disposable} from '@utils/disposable';
import {log} from '@utils/log';
import {genReactPage, genVuePage, genWpPage, genDefs, genFields, genTailwindCSS} from './generate';
import fileheader, {fileheaderUpdate} from './fileheader';
import ViewPanel from './template/view-panel';
import FileExplorer from './template/file-explorer';
import Config from '@utils/config';

export class CommandManager extends Disposable {
    private readonly context: vscode.ExtensionContext;

    /**
     * Creates the Git Graph Command Manager.
     * @param extensionPath The absolute file path of the directory containing the extension.
     * @param extensionState The Git Graph ExtensionState instance.
     * @param logger The Git Graph Logger instance.
     */
    constructor(context: vscode.ExtensionContext) {
        super();
        this.context = context;
        
        //命令
        //查看版本
        this.registerCommand('franky.version', () => this.version());
        //生成vue页面
        this.registerCommand('franky.generate.vue', (uri?: vscode.Uri) => genVuePage(uri));
        //生成react页面
        this.registerCommand('franky.generate.react', (uri?: vscode.Uri) => genReactPage(uri));
        //生成wp页面
        this.registerCommand('franky.generate.wp', (uri?: vscode.Uri) => genWpPage(uri));
        //生成defs
        this.registerCommand('franky.generate.defs', () => genDefs());
        //生成fields
        this.registerCommand('franky.generate.fields', () => genFields());
        //生成tailwindcss
        this.registerCommand('franky.generate.css2tailwind', (uri: vscode.Uri) => genTailwindCSS(uri));
        // cicd 跳转
        this.registerCommand('franky.jumpCicd', () => {
            const url = Config.cicdUrl;
            vscode.env.openExternal(vscode.Uri.parse(url));
        });
        //fileHeader 注释TODO: 功能开关
        this.registerCommand('franky.fileheader', () => fileheader());
        this.registerDisposable(
            vscode.workspace.onDidSaveTextDocument((file) => {
                setTimeout(() => {
                    fileheaderUpdate(file);
                }, 200);
            })
        );
        //动态模板-面板
        this.registerCommand('franky.template', (uri: vscode.Uri) => {
            //动态模板-panel
            ViewPanel.render(
                context.extensionUri,
                context.globalState,
                uri?.fsPath ?? vscode.workspace.workspaceFolders?.[0].uri.fsPath
            );
        })
        //动态模板-treeView
        new FileExplorer(this);
    }

    /**
     * Register a Git Graph command with Visual Studio Code.
     * @param command A unique identifier for the command.
     * @param callback A command handler function.
     */
    public registerCommand(command: string, callback: (...args: any[]) => any) {
        this.registerDisposable(
            vscode.commands.registerCommand(command, (...args: any[]) => {
                log.info('Command Invoked: ' + command);
                callback(...args);
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
            vscode.window.showInformationMessage(information, {modal: true}, 'Copy').then(
                (selectedItem) => {
                    if (selectedItem === 'Copy') {
                        copyToClipboard(information).then((result) => {
                            if (result !== null) {
                                showErrorMessage(result);
                            }
                        });
                    }
                },
                () => {}
            );
        } catch (_) {
            showErrorMessage('An unexpected error occurred while retrieving version information.');
        }
    }
}
