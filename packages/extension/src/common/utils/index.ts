import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

import {ErrorInfo} from './types'

// 获取插件版本
export function getExtensionVersion(extensionContext: vscode.ExtensionContext) {
	return new Promise<string>((resolve, reject) => {
		fs.readFile(path.join(extensionContext.extensionPath, 'package.json'), (err, data) => {
			if (err) {
				reject();
			} else {
				try {
					resolve(JSON.parse(data.toString()).version);
				} catch (_) {
					reject();
				}
			}
		});
	});
}
// 复制文本到剪贴板
export function copyToClipboard(text: string): Thenable<ErrorInfo> {
	return vscode.env.clipboard.writeText(text).then(
		() => null,
		() => '复制失败'
	);
}
// 显示信息消息
export function showInformationMessage(message: string) {
	return vscode.window.showInformationMessage(message).then(() => { }, () => { });
}

// 显示错误消息
export function showErrorMessage(message: string) {
	return vscode.window.showErrorMessage(message).then(() => { }, () => { });
}
// 打开扩展设置
export function openExtensionSettings(): Thenable<ErrorInfo> {
	return vscode.commands.executeCommand('workbench.action.openSettings', '@ext:northseacoder.franky').then(
		() => null,
		() => '配置文件打开失败'
	);
}
// 打开git控制视图
export function viewScm(): Thenable<ErrorInfo> {
	return vscode.commands.executeCommand('workbench.view.scm').then(
		() => null,
		() => 'Visual Studio Code was unable to open the Source Control View.'
	);
}