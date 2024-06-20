import vscode from 'vscode';
import path from 'path';
import fs from 'fs';

import {log} from '@utils/log';

import {readdir, stat, mkdir, readfile, exists, writefile, rmrf, unlink, rename, normalizeNFC} from './utils';
import FileStat from './file-stat';

import {getLoaclPath} from '../utils';
interface Entry {
    uri: vscode.Uri;
    type: vscode.FileType;
}

async function getStat(path: string): Promise<vscode.FileStat> {
    return new FileStat(await stat(path));
}
async function readDirectory(uri: vscode.Uri): Promise<[string, vscode.FileType][]> {
    const children = await readdir(uri.fsPath);

    const result: [string, vscode.FileType][] = [];
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const stat = await getStat(path.join(uri.fsPath, child));
        result.push([child, stat.type]);
    }

    return Promise.resolve(result);
}

export class FileSystemProvider implements vscode.TreeDataProvider<Entry>, vscode.FileSystemProvider {
    private _onDidChangeFile: vscode.EventEmitter<vscode.FileChangeEvent[]>;
    private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | void> = new vscode.EventEmitter<
        vscode.TreeItem | undefined | void
    >();
    constructor() {
        this._onDidChangeFile = new vscode.EventEmitter<vscode.FileChangeEvent[]>();
    }
    refresh(): void {
        this._onDidChangeTreeData.fire();
    }
    //fileSyatem
    get onDidChangeFile(): vscode.Event<vscode.FileChangeEvent[]> {
        return this._onDidChangeFile.event;
    }
    watch(uri: vscode.Uri, options: {recursive: boolean; excludes: string[]}): vscode.Disposable {
        log.info('watch', uri.fsPath);
        const watcher = fs.watch(uri.fsPath, {recursive: options.recursive}, async (event, filename) => {
            if (filename) {
                const filepath = path.join(uri.fsPath, normalizeNFC(filename.toString()));

                this._onDidChangeFile.fire([
                    {
                        type:
                            event === 'change'
                                ? vscode.FileChangeType.Changed
                                : (await exists(filepath))
                                ? vscode.FileChangeType.Created
                                : vscode.FileChangeType.Deleted,
                        uri: uri.with({path: filepath})
                    } as vscode.FileChangeEvent
                ]);
            }
        });

        return {dispose: () => watcher.close()};
    }
    stat(uri: vscode.Uri): vscode.FileStat | Thenable<vscode.FileStat> {
        return getStat(uri.fsPath);
    }
    readDirectory(uri: vscode.Uri): [string, vscode.FileType][] | Thenable<[string, vscode.FileType][]> {
        return readDirectory(uri);
    }
    createDirectory(uri: vscode.Uri): void | Thenable<void> {
        return mkdir(uri.fsPath);
    }
    readFile(uri: vscode.Uri): Uint8Array | Thenable<Uint8Array> {
        return readfile(uri.fsPath);
    }
    delete(uri: vscode.Uri, options: {recursive: boolean}): void | Thenable<void> {
        if (options.recursive) {
            return rmrf(uri.fsPath);
        }

        return unlink(uri.fsPath);
    }
    async rename(oldUri: vscode.Uri, newUri: vscode.Uri, options: {overwrite: boolean}): Promise<void> {
        const isExist = await exists(newUri.fsPath);

        if (isExist) {
            if (!options.overwrite) {
                throw vscode.FileSystemError.FileExists();
            } else {
                await rmrf(newUri.fsPath);
            }
        }

        const parentExists = await exists(path.dirname(newUri.fsPath));
        if (!parentExists) {
            await mkdir(path.dirname(newUri.fsPath));
        }

        return rename(oldUri.fsPath, newUri.fsPath);
    }
    async writeFile(
        uri: vscode.Uri,
        content: Uint8Array,
        options: {create: boolean; overwrite: boolean}
    ): Promise<void> {
        const isExist = await exists(uri.fsPath);
        if (!isExist) {
            if (!options.create) {
                throw vscode.FileSystemError.FileNotFound();
            }

            await mkdir(path.dirname(uri.fsPath));
        } else {
            if (!options.overwrite) {
                throw vscode.FileSystemError.FileExists();
            }
        }
        return writefile(uri.fsPath, content as Buffer);
    }

    //treeView
    getTreeItem(element: Entry): vscode.TreeItem {
        const treeItem = new vscode.TreeItem(
            element.uri,
            element.type === vscode.FileType.Directory
                ? vscode.TreeItemCollapsibleState.Collapsed
                : vscode.TreeItemCollapsibleState.None
        );
        if (element.type === vscode.FileType.File) {
            treeItem.command = {command: 'fileExplorer.openFile', title: 'Open File', arguments: [element.uri]};
            treeItem.contextValue = 'file';
        }
        return treeItem;
    }

    async getChildren(element?: Entry): Promise<Entry[]> {
        try {
            if (element) {
                const children = await readDirectory(element.uri);
                return children.map(([name, type]) => ({
                    uri: vscode.Uri.file(path.join(element.uri.fsPath, name)),
                    type
                }));
            }

            const localPath = getLoaclPath('tpls');
            if (localPath) {
                log.info(localPath);
                const localUri = vscode.Uri.file(localPath);
                const children = await readDirectory(localUri);
                log.info('getChildren-children', children);
                children.sort((a, b) => {
                    if (a[1] === b[1]) {
                        return a[0].localeCompare(b[0]);
                    }
                    return a[1] === vscode.FileType.Directory ? -1 : 1;
                });
                return children.map(([name, type]) => ({
                    uri: vscode.Uri.file(path.join(localPath, name)),
                    type
                }));
            }
        } catch (error) {
            log.debug(error);
        }

        return [];
    }
}
