import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

import { ErrorInfo } from './types';
import { log } from './log';

/**
 * Get extension version from package.json
 */
export function getExtensionVersion(extensionContext: vscode.ExtensionContext): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(path.join(extensionContext.extensionPath, 'package.json'), (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          resolve(JSON.parse(data.toString()).version);
        } catch (error) {
          reject(error);
        }
      }
    });
  });
}

/**
 * Copy text to clipboard
 */
export function copyToClipboard(text: string): Promise<ErrorInfo> {
  return new Promise<ErrorInfo>((resolve) => {
    vscode.env.clipboard.writeText(text).then(
      () => resolve(null),
      () => resolve('复制失败')
    );
  });
}

/**
 * Show information message
 */
export function showInformationMessage(message: string): Promise<void> {
  return new Promise<void>((resolve) => {
    vscode.window.showInformationMessage(message).then(
      () => resolve(),
      () => resolve()
    );
  });
}

/**
 * Show error message
 */
export function showErrorMessage(message: string): Promise<void> {
  return new Promise<void>((resolve) => {
    vscode.window.showErrorMessage(message).then(
      () => resolve(),
      (err) => {
        log.info('showErrorMessage-err', err);
        resolve();
      }
    );
  });
}

/**
 * Open extension settings
 */
export function openExtensionSettings(): Promise<ErrorInfo> {
  return new Promise<ErrorInfo>((resolve) => {
    vscode.commands
      .executeCommand('workbench.action.openSettings', '@ext:northseacoder.franky')
      .then(
        () => resolve(null),
        () => resolve('配置文件打开失败')
      );
  });
}

/**
 * Open git source control view
 */
export function viewScm(): Promise<ErrorInfo> {
  return new Promise<ErrorInfo>((resolve) => {
    vscode.commands.executeCommand('workbench.view.scm').then(
      () => resolve(null),
      () => resolve('Visual Studio Code was unable to open the Source Control View.')
    );
  });
}
