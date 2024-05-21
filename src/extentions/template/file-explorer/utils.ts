import fs from 'fs';
import vscode from 'vscode';
import {mkdirp} from 'mkdirp';
import {rimraf} from 'rimraf';
import simpleGit from 'simple-git';
import path from 'path';
import os from 'os';
import { log } from '@utils/log';

import Config from '@utils/config';
function massageError(error: Error & {code?: string}): Error {
    if (error.code === 'ENOENT') {
        return vscode.FileSystemError.FileNotFound();
    }

    if (error.code === 'EISDIR') {
        return vscode.FileSystemError.FileIsADirectory();
    }

    if (error.code === 'EEXIST') {
        return vscode.FileSystemError.FileExists();
    }

    if (error.code === 'EPERM' || error.code === 'EACCES') {
        return vscode.FileSystemError.NoPermissions();
    }

    return error;
}

function handleResult<T>(
    resolve: (result: T) => void,
    reject: (error: Error) => void,
    error: Error | null | undefined,
    result: T
): void {
    if (error) {
        reject(massageError(error));
    } else {
        resolve(result);
    }
}

export function normalizeNFC(items: string): string;
export function normalizeNFC(items: string[]): string[];
export function normalizeNFC(items: string | string[]): string | string[] {
    if (process.platform !== 'darwin') {
        return items;
    }

    if (Array.isArray(items)) {
        return items.map((item) => item.normalize('NFC'));
    }

    return items.normalize('NFC');
}

export function readdir(path: string): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
        fs.readdir(path, (error, children) => handleResult(resolve, reject, error, normalizeNFC(children)));
    });
}

export function stat(path: string): Promise<fs.Stats> {
    return new Promise<fs.Stats>((resolve, reject) => {
        fs.stat(path, (error, stat) => handleResult(resolve, reject, error, stat));
    });
}

export function mkdir(path: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        mkdirp(path)
            .then(() => handleResult(resolve, reject, null, void 0))
            .catch((error) => handleResult(resolve, reject, error, void 0));
    });
}
export function readfile(path: string): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
        fs.readFile(path, (error, buffer) => handleResult(resolve, reject, error, buffer));
    });
}
export function writefile(path: string, content: Buffer): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        fs.writeFile(path, content, (error) => handleResult(resolve, reject, error, void 0));
    });
}
export function exists(path: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        fs.exists(path, (exists) => handleResult(resolve, reject, null, exists));
    });
}
export function rmrf(path: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        rimraf(path)
            .then(() => handleResult(resolve, reject, null, void 0))
            .catch((error) => handleResult(resolve, reject, error, void 0));
    });
}
export function unlink(path: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        fs.unlink(path, error => handleResult(resolve, reject, error, void 0));
    });
}
export function rename(oldPath: string, newPath: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        fs.rename(oldPath, newPath, error => handleResult(resolve, reject, error, void 0));
    });
}

const git = simpleGit();

export async function updateTemplatesRepo() {
    const url = Config.templateRepository
    const templateLocal = Config.templateLocal
    const localPath = path.join(os.tmpdir(), templateLocal);
    try {
        log.info(url,templateLocal,localPath,fs.existsSync(localPath))
        if (fs.existsSync(localPath)) {
          // 如果本地已经有模板仓库，就拉取最新的变更
          await git.cwd(localPath).pull();
        } else {
          // 如果本地没有模板仓库，就克隆仓库
          await git.clone(url, localPath);
        }
    } catch (error) {
        log.debug(error)
    }
  
  }