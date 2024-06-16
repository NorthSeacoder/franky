import * as vscode from 'vscode';
import {getUri} from './utils';
import * as path from 'path';
import {emptyDir, mkdirp, pathExists, readdir, remove, readFileSync} from 'fs-extra';
import {modifyHtml} from 'html-modifier';
import {log} from '@utils/log';
import {handleName, getCommonRenderData} from '@utils/tools';

import {readPackageDetails, copyFolder} from '@utils/file';

import {getLoaclPath} from '../utils';

export default class CreateProjectPanel {
    public static currentPanel: CreateProjectPanel | undefined;
    private readonly _panel: vscode.WebviewPanel;
    private _disposables: vscode.Disposable[] = [];
    private cwd?: string;
    private globalState!: vscode.Memento;

    /**
     * The HelloWorldPanel class private constructor (called only from the render method).
     *
     * @param panel A reference to the webview panel
     * @param extensionUri The URI of the directory containing the extension
     */
    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        this._panel = panel;

        // Set an event listener to listen for when the panel is disposed (i.e. when the user closes
        // the panel or when the panel is closed programmatically)
        this._panel.onDidDispose(this.dispose, null, this._disposables);
        this.resolveWebviewView(extensionUri);
    }

    async resolveWebviewView(extensionUri: vscode.Uri) {
        // Set the HTML content for the webview panel
        this._panel.webview.html = await this.getWebviewHtml(this._panel.webview, extensionUri);

        // Set an event listener to listen for messages passed from the webview context
        this._setWebviewMessageListener(this._panel.webview);
    }
    /**
     * Renders the current webview panel if it exists otherwise a new webview panel
     * will be created and displayed.
     *
     * @param extensionUri The URI of the directory containing the extension.
     */
    public static render(extensionUri: vscode.Uri, globalState: vscode.Memento, cwd?: string) {
        log.info('render', cwd);
        if (CreateProjectPanel.currentPanel) {
            // If the webview panel already exists reveal it
            CreateProjectPanel.currentPanel._panel.reveal(vscode.ViewColumn.One);
            CreateProjectPanel.currentPanel.cwd = cwd;
            CreateProjectPanel.currentPanel.globalState = globalState;
            CreateProjectPanel.currentPanel._panel.webview.postMessage({
                command: 'currentPathWatcher',
                cwd
            });
        } else {
            // If a webview panel does not already exist create and show a new one
            const panel = vscode.window.createWebviewPanel(
                // Panel view type
                'view-panel',
                // Panel title
                '生成模板',
                // The editor column the panel should be displayed in
                vscode.ViewColumn.One,
                // Extra panel configurations
                {
                    // Enable JavaScript in the webview
                    enableScripts: true
                }
            );

            CreateProjectPanel.currentPanel = new CreateProjectPanel(panel, extensionUri);
            CreateProjectPanel.currentPanel.cwd = cwd;
            CreateProjectPanel.currentPanel.globalState = globalState;
        }
    }

    /**
     * Cleans up and disposes of webview resources when the webview panel is closed.
     */
    public dispose() {
        CreateProjectPanel.currentPanel = undefined;

        // Dispose of the current webview panel
        this._panel?.dispose();

        // Dispose of all disposables (i.e. commands) for the current webview panel
        // while (this._disposables.length) {
        //     const disposable = this._disposables.pop();
        //     if (disposable) {
        //         disposable.dispose();
        //     }
        // }
    }
    /**
     * 处理前端应用 index.html 文件的方法
     * @param webview vscode.Webview 类型，指向 vscode.WebviewView 的一个属性：webview
     * @returns 处理好的 index.html 文本内容
     */
    protected async getWebviewHtml(webview: vscode.Webview, extensionUri: vscode.Uri) {
        const distDir = 'dist/view';
        const indexPath = 'dist/view/index.html';
        // 前端应用的打包结果所在的目录，形如：https://file%2B.vscode-resource.vscode-cdn.net/d%3A/AAAAA/self/vscode-webview-example/packages/extension/out/view-vue
        const webviewUri = getUri(webview, extensionUri, [distDir]).toString();
        // 需要在前端应用中插入的脚本，目的是：将上述 webviewUri 所指的目录告知前端应用，前端应用在定位资源时需要
        const injectInContent = `<script> window.__webview_public_path__ = "${webviewUri}"</script>`;

        const htmlPath = path.join(extensionUri.fsPath, indexPath);
        // 读取 index.html 文件内容
        const htmlText = readFileSync(htmlPath).toString();
        // 使用 html-modifier 库来处理读取的内容，主要的作用是：1、将 script、link 标签中的 src、href 的值，重新赋予正确的值，2、将上述 injectInContent 的内容插入读取的内容中
        return await modifyHtml(htmlText, {
            onopentag(name, attribs) {
                if (name === 'script') attribs.src = path.join(webviewUri, attribs.src);
                if (name === 'link') attribs.href = path.join(webviewUri, attribs.href);
                return {name, attribs};
            },
            oncomment(data) {
                const hasMark = data?.toString().toLowerCase().includes('__webview_public_path__');
                return hasMark ? {data: injectInContent, clearComment: true} : {data};
            }
        });
    }

    /**
     * Sets up an event listener to listen for messages passed from the webview context and
     * executes code based on the message that is recieved.
     *
     * @param webview A reference to the extension webview
     * @param context A reference to the extension context
     */
    private _setWebviewMessageListener(webview: vscode.Webview) {
        const map = new Map<string, (...args: any[]) => any>();
        const _this = this;
        map.set('hello', (text: string) => {
            log.info('hello', text);
            vscode.window.showInformationMessage(text);
        });
        map.set('selectPath', async (loc) => {
            try {
                const res = await vscode.window.showOpenDialog({
                    canSelectFiles: false,
                    canSelectFolders: true,
                    canSelectMany: false,
                    title: 'Location',
                    defaultUri: loc ? vscode.Uri.file(loc) : undefined
                });
                if (!res) {
                    return null;
                }
                return vscode.Uri.parse(res[0].path).fsPath;
            } catch (error) {
                log.debug('selectPath', error);
            }
        });
        interface FormsValues {
            [x: string]: unknown;
            location: string;
            name: string;
            template: string;
        }
        map.set('generateCode', async (data: FormsValues) => {
            // TODO: 生成文件
            const tplroot = getLoaclPath('tpls');
            const {template, location, name, justFiles, ...rest} = data;
            const src = path.join(tplroot, template.trim());
            const target = path.join(location.trim(), justFiles ? '' : name.trim());
            await copyFolder(src, target, {...handleName(name), ...getCommonRenderData(), ...rest},justFiles);
            log.info('generateCode', src, target,justFiles);
            this.dispose();
        });
        // map.set('getGenerators', () => vscode.workspace.getConfiguration('newProject').get('generators'));
        map.set('getCurrentPath', () => this.cwd);
        map.set('geLocalPath', () => getLoaclPath());
        map.set('getTemplateOptions', async () => {
            const localPath = getLoaclPath('tpls');
            const templatesDeatil = await readPackageDetails(localPath);
            return templatesDeatil;
        });
        map.set('getState', (key: string) => this.globalState.get(key));
        map.set('setState', (key: string, value: any) => this.globalState.update(key, value));

        webview.onDidReceiveMessage(
            async (message: any) => {
                const {command, data = [], callback} = message;
                if (!map.has(command)) {
                    throw new Error(`找不到命令1 ${command}`);
                }
                const res = await map.get(command)!(...data);
                if (callback) {
                    // console.log('callback: ', callback)
                    this._panel.webview.postMessage({
                        command: callback,
                        data: [res]
                    });
                }
            },
            undefined,
            this._disposables
        );
    }
}
