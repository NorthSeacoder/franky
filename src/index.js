/*
 * @Author: pengmeng
 * @Date: 2021-01-05 19:32:16
 * @Last Modified by: mengpeng 
 * @Last Modified time: 2021-11-23 11:28:59 
 */
import vscode from 'vscode';
import {fileheader, fileheaderUpdate} from '@extentions/fileheader';
import diffLog from '@extentions/diff-log';

/**
 * @param {vscode.ExtensionContext} context
 */
export const activate = (context) => {
    console.log('"franky" is now active!');
    context.subscriptions.push(
        vscode.commands.registerCommand('franky.fileheader', fileheader),
        vscode.commands.registerCommand('franky.diffLog', diffLog)
    );
    vscode.workspace.onDidSaveTextDocument((file) => {
        setTimeout(() => {
            fileheaderUpdate(file);
        }, 200);
    });
};
// exports.activate = activate;

// this method is called when your extension is deactivated
export const deactivate = () => {};
